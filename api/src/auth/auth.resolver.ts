import { UseGuards } from '@nestjs/common'
import { InjectQueryService, QueryService } from '@nestjs-query/core'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { configService } from 'src/config/config.service'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { CurrentSession } from './currentsession.decorator'
import { LocalLoginGuard } from './local/locallogin.guard'
import { UserSession } from './session'
import { RegisterDto } from './dto/register.dto'
import { promisify } from 'util'
import { UserEntity } from 'src/user/entity/user.entity'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'
import { UserDto } from 'src/user/dto/user.dto'
import { UserDeviceDto } from 'src/user/dto/userdevice.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Resolver()
export class AuthResolver {
  constructor(
    @InjectQueryService(UserEntity)
    private readonly userService: QueryService<UserEntity>,
    @InjectQueryService(UserDeviceEntity)
    private readonly userDeviceService: QueryService<UserDeviceEntity>,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new LocalLoginGuard())
  async login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('email') _email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('password') _password: string,
  ): Promise<boolean> {
    return true
  }

  @Query(() => UserDto)
  @UseGuards(new AuthGuard({ deviceMustBeLogged: false }))
  async me(@CurrentSession() session: UserSession) {
    return this.userService.findById(session.id)
  }

  @Query(() => UserDeviceDto)
  @UseGuards(new AuthGuard())
  async currentDevice(@CurrentSession() session: UserSession) {
    return this.userDeviceService.findById(session.deviceId!)
  }

  @Mutation(() => Boolean)
  async register(@Args('data') data: RegisterDto): Promise<boolean> {
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

  @Query(() => Boolean)
  async verifyResetPasswordToken(
    @Args('id') id: string,
    @Args('token') token: string,
  ): Promise<boolean> {
    return !!(await this.authService.verifyResetToken(id, token))
  }

  @Mutation(() => Boolean)
  logout(@Context() context: any): boolean {
    context.req.logOut()
    return true
  }

  @Mutation(() => Boolean)
  async sendResetPassword(@Args('email') email: string): Promise<boolean> {
    return this.authService.sendResetPassword(email)
  }

  @Mutation(() => Boolean)
  async resetPassword(@Args('data') data: ResetPasswordDto): Promise<boolean> {
    return this.authService.resetPassword(data)
  }

  @Mutation(() => Boolean)
  async activateAccount(
    @Args('validationCode') validationCode: string,
  ): Promise<boolean> {
    await this.authService.activateAccount(validationCode)
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard({ deviceMustBeLogged: false }))
  async setDevice(
    @CurrentSession() session: UserSession,
    @Args('deviceName') deviceName: string,
    @Args('deviceSecret') deviceSecret: string,
    @Context() context: any,
  ): Promise<boolean> {
    const device = await this.authService.verifyDevice(
      session.id,
      deviceName,
      deviceSecret,
    )
    session.deviceId = device.id
    session.deviceName = deviceName
    promisify(context.req.logIn).call(context.req, session)
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard({ deviceMustBeLogged: false }))
  async createDevice(
    @CurrentSession() session: UserSession,
    @Args('deviceName') deviceName: string,
    @Args('deviceSecret') deviceSecret: string,
    @Context() context: any,
  ): Promise<boolean> {
    const device = await this.authService.createDevice(
      session.id,
      deviceName,
      deviceSecret,
    )
    session.deviceId = device.id
    session.deviceName = deviceName
    promisify(context.req.logIn).call(context.req, session)
    return true
  }
}
