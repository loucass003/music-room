import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentSession } from 'src/auth/currentsession.decorator'
import { UserSession } from 'src/auth/session'
import { ConversationService } from '../conversation.service'
import { ConversationDto } from '../dto/conversation.dto'
import { MessageDto } from '../dto/message.dto'
import { NewMessageEventDto } from '../dto/messageevent.dto'
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

  @Subscription(() => MessageDto, {
    filter: (payload, variables) =>
      payload.conversationId == variables.conversation,
    resolve: data => data,
  })
  @UseGuards(new AuthGuard())
  watchMessages(
    @CurrentSession() session: UserSession,
    @Args('conversation', { type: () => ID }) conversation: string,
  ) {
    return this.pubSub.asyncIterator(['messageEvent'])
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
      'messageEvent',
      new NewMessageEventDto({
        messageId: message.id,
        conversationId: conversation,
      }),
    )
    return true
  }
}
