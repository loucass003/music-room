import { Relation } from '@nestjs-query/query-graphql'
import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql'
import { ConversationDto } from './conversation.dto'
import { MessageDto } from './message.dto'

@ObjectType('NewMessageEvent')
@Relation('conversation', () => ConversationDto)
@Relation('message', () => MessageDto)
export class NewMessageEventDto {
  constructor(p: {
    [K in keyof NewMessageEventDto]: NewMessageEventDto[K]
  }) {
    Object.assign(this, p)
  }

  @Field(() => MessageDto)
  message!: MessageDto

  conversationId!: string
}

export const ConversationEvent = createUnionType({
  name: 'ConversationEvent',
  types: () => [NewMessageEventDto],
})
