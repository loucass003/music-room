import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { UserEntity } from 'src/user/entity/user.entity'
import { ConversationService } from './conversation.service'
import { ConversationDto } from './dto/conversation.dto'
import { MessageDto } from './dto/message.dto'
import { ConversationEntity } from './entity/conversation.entity'
import { MessageEntity } from './entity/message.entity'
import { ConversationResolver } from './resolver/conversation.resolver'
import { MessageResolver } from './resolver/message.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ConversationEntity,
          MessageEntity,
          UserEntity,
        ]),
      ],
      dtos: [{ DTOClass: ConversationDto }, { DTOClass: MessageDto }],
    }),
  ],
  providers: [
    ConversationService,
    ConversationResolver,
    MessageResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class ConversationModule {}
