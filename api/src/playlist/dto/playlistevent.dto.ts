import { Relation } from '@nestjs-query/query-graphql'
import { createUnionType, Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { UserDto } from 'src/user/dto/user.dto'
import { UserDeviceDto } from 'src/user/dto/userdevice.dto'
import { PlaylistDto } from './playlist.dto'

@ObjectType('PlaylistInviteEvent')
@Relation('playlist', () => PlaylistDto)
@Relation('device', () => UserDeviceDto)
@Relation('user', () => UserDto)
export class PlaylistInviteEventDto {
  constructor(
    p: { [K in keyof PlaylistInviteEventDto]: PlaylistInviteEventDto[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: string

  @Field(() => ID)
  deviceId!: string

  @Field()
  deviceName!: string

  @Field(() => ID)
  userId!: string

  @Field()
  userName!: string
}

@ObjectType('PlaylistKickEvent')
@Relation('playlist', () => PlaylistDto)
@Relation('device', () => UserDeviceDto)
@Relation('user', () => UserDto)
export class PlaylistKickEventDto {
  constructor(
    p: { [K in keyof PlaylistKickEventDto]: PlaylistKickEventDto[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: string

  @Field(() => ID)
  deviceId!: string

  @Field()
  deviceName!: string

  @Field(() => ID)
  userId!: string

  @Field()
  userName!: string
}

@ObjectType('PlaylistDeleteEvent')
@Relation('playlist', () => PlaylistDto)
export class PlaylistDeleteEventDto {
  constructor(
    p: { [K in keyof PlaylistDeleteEventDto]: PlaylistDeleteEventDto[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: string
}

@ObjectType('PlaylistUpdateEvent')
@Relation('playlist', () => PlaylistDto)
export class PlaylistUpdateEventDto {
  constructor(
    p: { [K in keyof PlaylistUpdateEventDto]: PlaylistUpdateEventDto[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  public?: boolean

  @Field({ nullable: true })
  everyoneCanEdit?: boolean
}

@ObjectType('PlaylistEntryMoveEvent')
@Relation('playlist', () => PlaylistDto)
export class PlaylistEntryMoveEventDto {
  constructor(
    p: { [K in keyof PlaylistEntryMoveEventDto]: PlaylistEntryMoveEventDto[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: string

  @Field(() => Int)
  index!: number

  @Field(() => Int)
  newIndex!: number
}

@ObjectType('PlaylistEntryRemoveEvent')
export class PlaylistEntryRemoveEventDto {
  constructor(
    p: {
      [K in keyof PlaylistEntryRemoveEventDto]: PlaylistEntryRemoveEventDto[K]
    },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: string

  @Field(() => Int)
  index!: number
}

@ObjectType('PlaylistEntryAddEvent')
export class PlaylistEntryAddEventDto {
  constructor(
    p: { [K in keyof PlaylistEntryAddEventDto]: PlaylistEntryAddEventDto[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: string

  @Field()
  youtubeId!: string
}

export const PlaylistEventDto = createUnionType({
  name: 'PlaylistEvent',
  types: () => [
    PlaylistInviteEventDto,
    PlaylistKickEventDto,
    PlaylistDeleteEventDto,
    PlaylistUpdateEventDto,
    PlaylistEntryMoveEventDto,
    PlaylistEntryRemoveEventDto,
    PlaylistEntryAddEventDto,
  ],
})
