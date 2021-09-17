import { Relation } from '@nestjs-query/query-graphql'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { MessageDto } from './message.dto'

@ObjectType('NewMessageEvent')
@Relation('playlist', () => MessageDto)
export class NewMessageEventDto {
  constructor(p: {
    [K in keyof NewMessageEventDto]: NewMessageEventDto[K]
  }) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  messageId!: string

  @Field(() => ID)
  conversationId!: string
}
