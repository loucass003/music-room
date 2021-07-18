import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configService } from './config/config.service'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import passport from 'passport'

const secret = 'some-cookie-secret'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.use(cookieSession({ secret }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(configService.getPort(), configService.getListenHost())
}
bootstrap()
