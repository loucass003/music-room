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
import { ResetPasswordTemplate } from 'src/mails/templates/resetpassword.template'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { ApiError, ApiErrors } from '@music-room/common'

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
      throw new BadRequestException(
        new ApiError(
          ApiErrors.AUTH_INVALID_CREDENTIALS,
          'invalid login or password',
        ),
      )
    }
    if (!user.emailValidated) {
      throw new BadRequestException(
        new ApiError(
          ApiErrors.AUTH_ACCOUNT_NOT_ACTIVATED,
          'you must validate your email first',
        ),
      )
    }
    return user
  }

  async createUser(data: RegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      email: data.email,
      name: data.name,
      password: await argon2.hash(data.password),
    })
    user.validationCode = this.createValidationCode()
    try {
      await this.userRepository.save(user)
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if ((e as any).constraint === UserEntity.NAME_UNIQUE_CONSTRAINT) {
          throw new BadRequestException(
            new ApiError(
              ApiErrors.AUTH_ACCOUNT_NAME_ALREADY_EXISTS,
              'name already taken',
            ),
          )
        } else if (
          (e as any).constraint === UserEntity.EMAIL_UNIQUE_CONSTRAINT
        ) {
          throw new BadRequestException(
            new ApiError(
              ApiErrors.AUTH_ACCOUNT_EMAIL_ALREADY_EXISTS,
              'an account with this email already exists',
            ),
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
          .replace('{}', user.validationCode),
      ),
      user.email,
    )
    return user
  }

  createValidationCode(): string {
    return crypto.randomBytes(16).toString('hex')
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
            throw new BadRequestException(
              new ApiError(
                ApiErrors.AUTH_ACCOUNT_NAME_ALREADY_EXISTS,
                'name already taken',
              ),
            )
          } else if (
            (e as any).constraint === UserEntity.EMAIL_UNIQUE_CONSTRAINT
          ) {
            throw new BadRequestException(
              new ApiError(
                ApiErrors.AUTH_ACCOUNT_EMAIL_ALREADY_EXISTS,
                'an account with this email already exists',
              ),
            )
          } else throw e
        } else throw e
      }
    }

    return user
  }

  async activateAccount(validationCode: string) {
    const user = await this.userRepository.findOne({ validationCode })

    if (!user)
      throw new NotFoundException(
        new ApiError(ApiErrors.AUTH_ACCOUNT_NOT_FOUND, 'cannot find account'),
      )
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

    if (!device)
      throw new NotFoundException(
        new ApiError(ApiErrors.AUTH_DEVICE_NOT_FOUND, 'cannot find device'),
      )

    if (!(await argon2.verify(device.secret, deviceSecret)))
      throw new BadRequestException(
        new ApiError(
          ApiErrors.AUTH_INVALID_DEVICE_SECRET,
          'invalid device secret',
        ),
      )

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
            new ApiError(
              ApiErrors.AUTH_DEVICE_NAME_ALREADY_EXISTS,
              'a device with this name already exists',
            ),
          )
        } else throw e
      } else throw e
    }

    return device
  }

  async sendResetPassword(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email })

    if (!user)
      throw new NotFoundException(
        new ApiError(
          ApiErrors.AUTH_ACCOUNT_NOT_FOUND,
          'no user found with this email',
        ),
      )

    user.resetToken = this.createValidationCode()
    const expireDate = new Date()
    expireDate.setTime(Date.now() + 1000 * 60 * 60) // Set the token to expire in one hour
    user.resetTokenExpire = expireDate
    await this.userRepository.save(user)

    this.mailsService.sendMail(
      new ResetPasswordTemplate(
        'Reset your password',
        user.name,
        configService
          .getPasswordResetUrl()
          .replace('{id}', user.id)
          .replace('{token}', user.resetToken),
      ),
      user.email,
    )

    return true
  }

  async verifyResetToken(id: string, token: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      id: id,
      resetToken: token,
    })

    if (!user)
      throw new BadRequestException(
        new ApiError(
          ApiErrors.AUTH_INVALID_RESET_PASSWORD_TOKEN,
          'invalid reset token',
        ),
      )
    if (user.resetTokenExpire && user.resetTokenExpire.getTime() < Date.now())
      throw new BadRequestException(
        new ApiError(
          ApiErrors.AUTH_INVALID_RESET_PASSWORD_TOKEN,
          'reset token expired',
        ),
      )
    return user
  }

  async resetPassword(data: ResetPasswordDto): Promise<boolean> {
    const user = await this.verifyResetToken(data.id, data.token)

    user.resetToken = null
    user.resetTokenExpire = null

    user.password = await argon2.hash(data.password)

    await this.userRepository.save(user)

    return true
  }
}
