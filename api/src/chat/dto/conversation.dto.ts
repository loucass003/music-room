/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Authorize,
  CursorConnection,
  FilterableField,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { AuthorizedCtx } from 'src/auth/session'
import { BaseDto } from 'src/base.dto'
import { PlaylistDto } from 'src/playlist/dto/playlist.dto'
import { UserDto } from 'src/user/dto/user.dto'
import { ConversationType } from '../entity/conversation.entity'
import { MessageDto } from './message.dto'

@ObjectType('Conversation')
@UnPagedRelation('members', () => UserDto, {
  disableUpdate: true,
  disableRemove: true,
})
@Relation('playlist', () => PlaylistDto, {
  disableUpdate: true,
  disableRemove: true,
})
@CursorConnection('messages', () => MessageDto, {
  disableRemove: true,
  disableUpdate: true,
})
@Authorize({
  authorize: (context: AuthorizedCtx, req) => ({
    members: { id: { eq: context.req.user?.id } },
  }),
})
export class ConversationDto extends BaseDto {
  @FilterableField()
  type!: ConversationType

  members: any
}
