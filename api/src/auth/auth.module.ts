import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UserEntity } from 'src/entities/user.entity'
import { LocalStrategy } from './local/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { CookieSerializer } from './cookie.serializer'
import { LocalLoginGuard } from './local/locallogin.guard'
import { GoogleStrategy } from './google/google.strategy'
import { GoogleAuthController } from './google/googleauth.controller'
import { MailsModule } from 'src/mails/mails.module'
import { UserDeviceEntity } from 'src/entities/userdevice.entity'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    MikroOrmModule.forFeature([UserEntity, UserDeviceEntity]),
    MailsModule,
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
