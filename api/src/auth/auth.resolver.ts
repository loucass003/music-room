import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { configService } from 'src/config/config.service'
import { UserEntity } from 'src/entities/user.entity'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { CurrentSession } from './currentsession.decorator'
import { LocalLoginGuard } from './local/locallogin.guard'
import { UserSession } from './session'
import { RegisterDto } from './dto/register.dto'

@Resolver()
export class AuthResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new LocalLoginGuard())
  async loginLocal(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('email') _email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('password') _password: string,
  ): Promise<boolean> {
    return true
  }

  @Query(() => UserEntity)
  @UseGuards(new AuthGuard())
  async me(@CurrentSession() session: UserSession) {
    return this.userRepository.findOneOrFail(session.id)
  }

  @Mutation(() => Boolean)
  async registerLocal(@Args('data') data: RegisterDto): Promise<boolean> {
    await this.authService.createUser(data)
    return true
  }

  @Query(() => String)
  googleOAuthUrl(): string {
    return configService.getGoogleOAuthUrl()
  }

  @Query(() => UserSession, { nullable: true })
  session(@CurrentSession() session: UserSession | null): UserSession | null {
    return session
  }

  @Mutation(() => Boolean)
  logout(@Context() context: any): boolean {
    context.req.logOut()
    return true
  }

  @Mutation(() => Boolean)
  async activateAccount(
    @Args('validationCode') validationCode: string,
  ): Promise<boolean> {
    await this.authService.activateAccount(validationCode)
    return true
  }
}
