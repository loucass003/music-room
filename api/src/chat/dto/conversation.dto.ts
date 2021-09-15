/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Authorize, FilterableField, OperationGroup, Relation } from '@nestjs-query/query-graphql'
import { Field, ObjectType } from '@nestjs/graphql'
import { AuthorizedCtx } from 'src/auth/session'
import { BaseDto } from 'src/base.dto'
import { PlaylistDto } from 'src/playlist/dto/playlist.dto'
import { UserDto } from 'src/user/dto/user.dto'
import { ConversationType } from '../entity/conversation.entity'

@ObjectType('Conversation')
@Relation('members', () => UserDto, {
  disableUpdate: true,
  disableRemove: true,
})
@Relation('playlist', () => PlaylistDto, {
  disableUpdate: true,
  disableRemove: true,
})
// @Authorize({
//   authorize: (context: AuthorizedCtx, req) => ({ members: { in: context.req.user?.id } }),
// })
export class ConversationDto extends BaseDto {

  @Field()
  type!: ConversationType

  members: any

}
