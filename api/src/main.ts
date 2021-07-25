import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configService } from './config/config.service'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import passport from 'passport'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.use(cookieParser())
  app.use(cookieSession({ secret: configService.getCookieSecret() }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(configService.getPort(), configService.getListenHost())
}
bootstrap()
