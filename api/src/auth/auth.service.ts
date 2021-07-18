import {
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { UserEntity } from 'src/entities/user.entity'
import * as argon2 from 'argon2'
import { RegisterDto } from './dto/register.dto'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { MailsService } from 'src/mails/mails.service'
import crypto from 'crypto'
import { ActivateAccountTemplate } from 'src/mails/templates/activateaccount.template'
import { configService } from 'src/config/config.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    private readonly mailsService: MailsService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email })
    if (
      !user ||
      !user.password ||
      !(await argon2.verify(user.password, password))
    ) {
      throw new UnauthorizedException('invalid login or password')
    }
    if (!user.emailValidated) {
      throw new UnauthorizedException('you must validate your email first')
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
      await this.userRepository.persistAndFlush(user)
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        if ((e as any).constraint === 'user_entity_name_unique') {
          throw new BadRequestException('name already taken')
        } else if ((e as any).constraint === 'user_entity_email_unique') {
          throw new BadRequestException(
            'an account with this email already exists',
          )
        }
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
        await this.userRepository.persistAndFlush(user)
      } catch (e) {
        if (e instanceof UniqueConstraintViolationException) {
          if ((e as any).constraint === 'user_entity_name_unique') {
            throw new BadRequestException('name already taken')
          } else if ((e as any).constraint === 'user_entity_email_unique') {
            throw new BadRequestException(
              'an account with this email already exists',
            )
          }
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
    await this.userRepository.persistAndFlush(user)
  }
}
