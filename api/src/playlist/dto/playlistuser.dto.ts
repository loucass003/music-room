/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Relation } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { BaseDto } from 'src/base.dto'
import { UserDto } from 'src/user/dto/user.dto'
import { UserDeviceDto } from 'src/user/dto/userdevice.dto'
import { PlaylistDto } from './playlist.dto'

@ObjectType('PlaylistUser')
@Relation('playlist', () => PlaylistDto, {
  disableUpdate: true,
  disableRemove: true,
})
@Relation('user', () => UserDto, { disableUpdate: true, disableRemove: true })
@Relation('userDevice', () => UserDeviceDto, {
  disableUpdate: true,
  disableRemove: true,
})
export class PlaylistUserDto extends BaseDto {}
