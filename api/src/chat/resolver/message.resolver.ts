import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { MessageDto } from '../dto/message.dto'
import { MessageEntity } from '../entity/message.entity'
import { InjectQueryService, QueryService } from '@nestjs-query/core'
import { ConversationService } from '../conversation.service'
import { Inject, UseGuards } from '@nestjs/common'
import { CurrentSession } from 'src/auth/currentsession.decorator'
import { UserSession } from 'src/auth/session'
import { NewMessageEventDto } from '../dto/messageevent.dto'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => MessageDto)
export class MessageResolver extends CRUDResolver(MessageDto, {
  create: {
    disabled: true,
  },
  update: {
    disabled: true,
  },
  delete: {
    disabled: true,
  },
  read: {
    disabled: false,
    guards: [new AuthGuard()],
  },
  aggregate: {
    disabled: true,
  },
}) {
  constructor(
    @InjectQueryService(MessageEntity)
    readonly service: QueryService<MessageEntity>,
    private readonly conversationService: ConversationService,
    @Inject('PUB_SUB') readonly pubSub: PubSub,
  ) {
    super(service)
  }
}
