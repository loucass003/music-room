import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { UserEntity } from 'src/user/entity/user.entity'
import { UserDto } from './dto/user.dto'
import { UserDeviceDto } from './dto/userdevice.dto'
import { UserDeviceEntity } from './entity/userdevice.entity'
import { UserResolver } from './resolver/user.resolver'
import { UserDeviceResolver } from './resolver/userdevice.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([UserEntity, UserDeviceEntity]),
      ],
      dtos: [{ DTOClass: UserDto }, { DTOClass: UserDeviceDto }],
    }),
  ],
  providers: [UserResolver, UserDeviceResolver],
  exports: [UserResolver, UserDeviceResolver],
})
export class UserModule {}
