import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { UserEntity } from 'src/entities/user.entity'
import * as argon2 from 'argon2'

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

  async createUser(email: string, password: string): Promise<UserEntity> {
    const user = this.userRepository.create({
      email,
      password: await argon2.hash(password),
    })
    await this.userRepository.persistAndFlush(user)
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
        email: googleProfile.emails.filter((email: any) => email.verified)[0],
      })
      await this.userRepository.persistAndFlush(user)
    }

    return user
  }
}
