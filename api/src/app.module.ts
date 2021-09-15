import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { configService } from './config/config.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MailsModule } from './mails/mails.module'
import { PlaylistModule } from './playlist/playlist.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cookieSession from 'cookie-session'
import { promisify } from 'util'
import { ServerResponse } from 'http'
import { ConversationModule } from './chat/conversation.module'

// this sucks, but there seems to be no alternative
const subscriptionConnectHandler = () => {
  const cookieParserM = cookieParser()
  const cookieSessionM = cookieSession({
    secret: configService.getCookieSecret(),
  })
  const passportInitializeM = passport.initialize()
  const passportSessionM = passport.session()
  return async (_params: any, ws: any) => {
    const req = ws.upgradeReq
    const res = new ServerResponse(req) as any
    await promisify(cookieParserM)(req, res)
    await promisify(cookieSessionM)(req, res)
    await promisify(passportInitializeM)(req, res)
    await promisify(passportSessionM)(req, res)
    return { req }
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      context: (opt: any) => {
        if (opt.connection) return opt.connection.context // subscription (ws)
        return opt
      },
      subscriptions: {
        onConnect: subscriptionConnectHandler(),
      },
      ...configService.getGraphQLConfig(),
    } as any),
    UserModule,
    AuthModule,
    MailsModule,
    PlaylistModule,
    ConversationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
