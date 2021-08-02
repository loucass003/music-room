/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Relation } from '@nestjs-query/query-graphql'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseDto } from 'src/base.dto'
import { UserDto } from './user.dto'
// import { PlaylistEntity } from './playlist.entity'
// import { PlaylistUserEntity } from './playlistuser.entity'

@ObjectType('UserDevice')
@Relation('user', () => UserDto, { disableUpdate: true, disableRemove: true })
export class UserDeviceDto extends BaseDto {
  @Field()
  name!: string
}
