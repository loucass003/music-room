import {
  NestjsQueryGraphQLModule,
  pubSubToken,
} from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { ConversationService } from './conversation.service'
import { ConversationDto } from './dto/conversation.dto'
import { ConversationEntity } from './entity/conversation.entity'
import { ConversationResolver } from './resolver/conversation.resolver'
// import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ConversationEntity
        ]),
      ],
      dtos: [{ DTOClass: ConversationDto }],
    }),
  ],
  providers: [
    ConversationService,
    ConversationResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class ConversationModule {}
