/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Authorize,
  BeforeCreateOne,
  CreateOneInputType,
  FilterableCursorConnection,
  FilterableField,
  OperationGroup,
  Relation,
} from '@nestjs-query/query-graphql'
import { Field, ObjectType } from '@nestjs/graphql'
import { AuthorizedCtx } from 'src/auth/session'
import { BaseDto } from 'src/base.dto'
import { UserDto } from 'src/user/dto/user.dto'
import { UserDeviceDto } from 'src/user/dto/userdevice.dto'
import { PlaylistEntryDto } from './playlistentry.dto'
import { PlaylistUserDto } from './playlistuser.dto'

@ObjectType('Playlist')
@Relation('owner', () => UserDto, { disableUpdate: true, disableRemove: true })
@Relation('ownerDevice', () => UserDeviceDto, {
  disableUpdate: true,
  disableRemove: true,
})
@FilterableCursorConnection('playlistUsers', () => PlaylistUserDto, {
  disableRemove: true,
  disableUpdate: true,
})
@Authorize({
  authorize: (context: AuthorizedCtx, req) =>
    req.operationGroup === OperationGroup.READ
      ? ({
          or: [
            { public: { eq: true } },
            { ownerDeviceId: { eq: context.req.user?.deviceId } },
            { playlistUsers: { id: { eq: context.req.user?.deviceId } } },
          ],
        } as any)
      : { ownerDeviceId: { eq: context.req.user?.deviceId } },
})
@BeforeCreateOne(
  (input: CreateOneInputType<PlaylistDto>, context: AuthorizedCtx) => {
    input.input.ownerId = context.req.user!.id
    input.input.ownerDeviceId = context.req.user!.deviceId!
    return input
  },
)
export class PlaylistDto extends BaseDto {
  @FilterableField()
  name!: string

  @Field()
  public!: boolean

  @Field()
  everyoneCanEdit!: boolean

  ownerId!: string
  ownerDeviceId!: string

  @Field(() => [PlaylistEntryDto])
  entries!: any

  // playlistUsers!: PlaylistUserDto[]

  entriesYoutubeIds!: string[]
  entriesNames!: string[]
}
