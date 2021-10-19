import { InjectQueryService, QueryService } from '@nestjs-query/core'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentSession } from 'src/auth/currentsession.decorator'
import { UserSession } from 'src/auth/session'
import { ConversationService } from '../conversation.service'
import { ConversationDto } from '../dto/conversation.dto'
import {
  ConversationEvent,
  NewMessageEventDto,
} from '../dto/conversationevent.dto'
import { ConversationEntity } from '../entity/conversation.entity'

@Resolver(() => ConversationDto)
export class ConversationResolver extends CRUDResolver(ConversationDto, {
  create: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
  read: {
    guards: [new AuthGuard()],
  },
}) {
  constructor(
    @InjectQueryService(ConversationEntity)
    readonly service: QueryService<ConversationEntity>,
    private readonly conversationService: ConversationService,
    @Inject('PUB_SUB') readonly pubSub: PubSub,
  ) {
    super(service)
  }

  @Subscription(() => ConversationEvent, {
    filter: (payload, variables) => {
      console.log(payload, variables)
      return payload.conversationId == variables.conversation
    },
    resolve: data => data,
  })
  @UseGuards(new AuthGuard())
  watchConversation(
    @CurrentSession() session: UserSession,
    @Args('conversation', { type: () => ID }) conversation: string,
  ) {
    console.log('watching', conversation)
    return this.pubSub.asyncIterator(['ConversationEvent'])
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async sendMessage(
    @CurrentSession() session: UserSession,
    @Args('conversation', { type: () => ID }) conversation: string,
    @Args('content') content: string,
  ): Promise<boolean> {
    const message = await this.conversationService.sendMessage(
      session.id,
      conversation,
      content,
    )
    await this.pubSub.publish(
      'ConversationEvent',
      new NewMessageEventDto({
        message: message,
        conversationId: conversation,
      }),
    )
    return true
  }
}
