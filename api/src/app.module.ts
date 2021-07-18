import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { configService } from './config/config.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MailsModule } from './mails/mails.module'

@Module({
  imports: [
    MikroOrmModule.forRoot(configService.getMikroOrmConfig()),
    GraphQLModule.forRoot(configService.getGraphQLConfig()),
    UserModule,
    AuthModule,
    MailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
