import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { configService } from './config/config.service'
import { UserEntity } from './entities/user.entity'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    MikroOrmModule.forRoot(configService.getMikroOrmConfig()),
    GraphQLModule.forRoot(configService.getGraphQLConfig()),
    MikroOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
