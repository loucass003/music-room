import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { LocalStrategy } from './local/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { CookieSerializer } from './cookie.serializer'
import { LocalLoginGuard } from './local/locallogin.guard'
import { GoogleStrategy } from './google/google.strategy'
import { GoogleAuthController } from './google/googleauth.controller'
import { MailsModule } from 'src/mails/mails.module'
import { UserModule } from 'src/user/user.module'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { UserEntity } from 'src/user/entity/user.entity'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
    MailsModule,
    NestjsQueryTypeOrmModule.forFeature([UserEntity, UserDeviceEntity]),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    GoogleStrategy,
    CookieSerializer,
    LocalLoginGuard,
  ],
  controllers: [GoogleAuthController],
})
export class AuthModule {}
