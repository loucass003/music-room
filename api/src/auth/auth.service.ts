import * as argon2 from 'argon2'
import { RegisterDto } from './dto/register.dto'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import crypto from 'crypto'
import { ActivateAccountTemplate } from 'src/mails/templates/activateaccount.template'
import { configService } from 'src/config/config.service'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/entity/user.entity'
import { MailsService } from 'src/mails/mails.service'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'
import { QueryFailedError, Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserDeviceEntity)
    private readonly deviceRepository: Repository<UserDeviceEntity>,
    private readonly mailsService: MailsService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email })
    if (
      !user ||
      !user.password ||
      !(await argon2.verify(user.password, password))
    ) {
      throw new BadRequestException('invalid login or password')
    }
    if (!user.emailValidated) {
      throw new BadRequestException('you must validate your email first')
    }
    return user
  }

  async createUser(data: RegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      email: data.email,
      name: data.name,
      password: await argon2.hash(data.password),
    })
    this.createValidationCode(user)
    try {
      await this.userRepository.save(user)
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if ((e as any).constraint === UserEntity.NAME_UNIQUE_CONSTRAINT) {
          throw new BadRequestException('name already taken')
        } else if (
          (e as any).constraint === UserEntity.EMAIL_UNIQUE_CONSTRAINT
        ) {
          throw new BadRequestException(
            'an account with this email already exists',
          )
        } else throw e
      } else throw e
    }

    await this.mailsService.sendMail(
      new ActivateAccountTemplate(
        'Activate your account',
        user.name,
        configService
          .getAccountActivationUrl()
          .replace('{}', user.validationCode!),
      ),
      user.email,
    )
    return user
  }

  createValidationCode(user: UserEntity) {
    const validationCode = crypto.randomBytes(16).toString('hex')
    user.validationCode = validationCode
  }

  async loginUserWithGoogle(
    _accessToken: string,
    _refreshToken: string,
    googleProfile: any,
  ): Promise<UserEntity> {
    let user = await this.userRepository.findOne({
      googleId: googleProfile.id,
    })

    if (!user) {
      user = this.userRepository.create({
        googleId: googleProfile.id,
        name: googleProfile.displayName,
        email: googleProfile.emails.filter((email: any) => email.verified)[0]
          .value,
        emailValidated: true,
      })
      try {
        await this.userRepository.save(user)
      } catch (e) {
        if (e instanceof QueryFailedError) {
          if ((e as any).constraint === UserEntity.NAME_UNIQUE_CONSTRAINT) {
            throw new BadRequestException('name already taken')
          } else if (
            (e as any).constraint === UserEntity.EMAIL_UNIQUE_CONSTRAINT
          ) {
            throw new BadRequestException(
              'an account with this email already exists',
            )
          } else throw e
        } else throw e
      }
    }

    return user
  }

  async activateAccount(validationCode: string) {
    const user = await this.userRepository.findOne({ validationCode })

    if (!user) throw new NotFoundException('cannot find account')
    user.validationCode = undefined
    user.emailValidated = true
    await this.userRepository.save(user)
  }

  // devices

  async verifyDevice(
    user: string,
    deviceName: string,
    deviceSecret: string,
  ): Promise<UserDeviceEntity> {
    const device = await this.deviceRepository.findOne({
      user: { id: user },
      name: deviceName,
    })

    if (!device) throw new NotFoundException('cannot find device')

    if (!(await argon2.verify(device.secret, deviceSecret)))
      throw new BadRequestException('invalid device secret')

    return device
  }

  async createDevice(
    user: string,
    deviceName: string,
    deviceSecret: string,
  ): Promise<UserDeviceEntity> {
    const device = this.deviceRepository.create({
      user: { id: user },
      name: deviceName,
      secret: await argon2.hash(deviceSecret),
    })

    try {
      await this.deviceRepository.save(device)
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (
          (e as any).constraint === UserDeviceEntity.USER_NAME_UNIQUE_CONSTRAINT
        ) {
          throw new BadRequestException(
            'a device with this name already exists',
          )
        } else throw e
      } else throw e
    }

    return device
  }
}
