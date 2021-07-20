import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { configService } from 'src/config/config.service'
import { UserEntity } from 'src/entities/user.entity'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { CurrentSession } from './currentsession.decorator'
import { LocalLoginGuard } from './local/locallogin.guard'
import { UserSession } from './session'
import { RegisterDto } from './dto/register.dto'
import { GraphQLResolveInfo } from 'graphql'
import fieldsToRelations from 'graphql-fields-to-relations'
import { promisify } from 'util'
import { UserDeviceEntity } from 'src/entities/userdevice.entity'

@Resolver()
export class AuthResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    @InjectRepository(UserDeviceEntity)
    private readonly deviceRepository: EntityRepository<UserDeviceEntity>,
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

  @Query(() => UserEntity)
  @UseGuards(new AuthGuard({ deviceMustBeLogged: false }))
  async me(
    @CurrentSession() session: UserSession,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.userRepository.findOneOrFail(
      session.id,
      fieldsToRelations(info),
    )
  }

  @Query(() => UserDeviceEntity)
  @UseGuards(new AuthGuard())
  async currentDevice(
    @CurrentSession() session: UserSession,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.deviceRepository.findOneOrFail(
      session.deviceId!,
      fieldsToRelations(info),
    )
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
