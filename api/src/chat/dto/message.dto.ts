import { Authorize, Relation } from '@nestjs-query/query-graphql'
import { Field, ObjectType } from '@nestjs/graphql'
import { AuthorizedCtx } from 'src/auth/session'
import { BaseDto } from 'src/base.dto'
import { UserDto } from 'src/user/dto/user.dto'
import { ConversationEntity } from '../entity/conversation.entity'
import { ConversationDto } from './conversation.dto'

@ObjectType('Message')
@Relation('conversation', () => ConversationDto, {
  disableUpdate: true,
  disableRemove: true,
})
@Relation('author', () => UserDto, {
  disableUpdate: true,
  disableRemove: true,
})
// @Authorize({
//   authorize: (context: AuthorizedCtx, req) =>
//     ({
//       conversation: { members: { id: { eq: context.req.user?.id } } },
//     } as any),
// })
export class MessageDto extends BaseDto {
  @Field(() => String)
  content!: string

  // conversation!: any
}
