import { createUnionType, Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PlaylistInviteEvent {
  constructor(p: { [K in keyof PlaylistInviteEvent]: PlaylistInviteEvent[K] }) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: number

  @Field(() => ID)
  deviceId!: number

  @Field()
  deviceName!: string

  @Field(() => ID)
  userId!: number

  @Field()
  userName!: string
}

@ObjectType()
export class PlaylistKickEvent {
  constructor(p: { [K in keyof PlaylistInviteEvent]: PlaylistInviteEvent[K] }) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: number

  @Field(() => ID)
  deviceId!: number

  @Field()
  deviceName!: string

  @Field(() => ID)
  userId!: number

  @Field()
  userName!: string
}

@ObjectType()
export class PlaylistDeleteEvent {
  constructor(p: { [K in keyof PlaylistDeleteEvent]: PlaylistDeleteEvent[K] }) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: number
}

@ObjectType()
export class PlaylistUpdateEvent {
  constructor(p: { [K in keyof PlaylistUpdateEvent]: PlaylistUpdateEvent[K] }) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: number

  @Field()
  name?: string

  @Field()
  public?: boolean

  @Field()
  everyoneCanEdit?: boolean
}

@ObjectType()
export class PlaylistEntryMoveEvent {
  constructor(
    p: { [K in keyof PlaylistEntryMoveEvent]: PlaylistEntryMoveEvent[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: number

  @Field(() => Int)
  index!: number

  @Field(() => Int)
  newIndex!: number
}

@ObjectType()
export class PlaylistEntryRemoveEvent {
  constructor(
    p: { [K in keyof PlaylistEntryRemoveEvent]: PlaylistEntryRemoveEvent[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: number

  @Field(() => Int)
  index!: number
}

@ObjectType()
export class PlaylistEntryAddEvent {
  constructor(
    p: { [K in keyof PlaylistEntryAddEvent]: PlaylistEntryAddEvent[K] },
  ) {
    Object.assign(this, p)
  }

  @Field(() => ID)
  playlistId!: number

  @Field()
  youtubeId!: string
}

export const PlaylistEvent = createUnionType({
  name: 'PlaylistEvent',
  types: () => [
    PlaylistInviteEvent,
    PlaylistKickEvent,
    PlaylistDeleteEvent,
    PlaylistUpdateEvent,
    PlaylistEntryMoveEvent,
    PlaylistEntryRemoveEvent,
    PlaylistEntryAddEvent,
  ],
})
