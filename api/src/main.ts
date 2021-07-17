import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configService } from './config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(configService.getPort(), configService.getListenHost())
}
bootstrap()
