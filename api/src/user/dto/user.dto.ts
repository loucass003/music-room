/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Authorize,
  FilterableField,
  OperationGroup,
  UnPagedRelation,
} from '@nestjs-query/query-graphql'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsSelfMiddleware } from '../../util/isself.middleware'
import { UserDeviceDto } from './userdevice.dto'
import { BaseDto } from 'src/base.dto'
import { AuthorizedCtx } from 'src/auth/session'
// import { PlaylistEntity } from './playlist.entity'
// import { PlaylistUserEntity } from './playlistuser.entity'

@ObjectType('User')
@UnPagedRelation('devices', () => UserDeviceDto, {
  disableRemove: true,
  disableUpdate: true,
})
@Authorize({
  authorize: (context: AuthorizedCtx, req) =>
    req.operationGroup === OperationGroup.READ
      ? {}
      : { id: { eq: context.req.user?.id } },
})
// @Relation('playlistUsers', () => PlaylistUserEntity, { disableRemove: true })
// @Relation('ownPlaylists', () => PlaylistEntity, { disableRemove: true })
export class UserDto extends BaseDto {
  @FilterableField()
  name!: string

  @Field({ middleware: [IsSelfMiddleware] })
  email!: string
}
