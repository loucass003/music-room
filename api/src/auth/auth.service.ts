import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { UserEntity } from 'src/entities/user.entity'
import * as argon2 from 'argon2'
import { validate } from 'class-validator'
import { RegisterDto } from './dto/register.dto'
import { BadRequestException } from '@nestjs/common'

export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ email })
    if (
      !user ||
      !user.password ||
      !(await argon2.verify(user.password, password))
    ) {
      return null
    }
    return user
  }

  async createUser(data: RegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      email: data.email,
      name: data.name,
      password: await argon2.hash(data.password),
    })
    try {
      await this.userRepository.persistAndFlush(user)
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        if ((e as any).constraint === 'user_entity_name_unique') {
          throw new BadRequestException('name already taken')
        } else if ((e as any).constraint === 'user_entity_email_unique') {
          throw new BadRequestException('email already taken')
        }
      }
    }
    return user
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
      })
      await this.userRepository.persistAndFlush(user)
    }

    return user
  }
}
