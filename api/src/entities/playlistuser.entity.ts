/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, ManyToOne, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { PlaylistEntity } from './playlist.entity'
import { UserEntity } from './user.entity'
import { UserDeviceEntity } from './userdevice.entity'

@ObjectType()
@Entity()
@Unique({
  properties: ['playlist', 'userDevice'],
  name: PlaylistUserEntity.PLAYLIST_DEVICE_CONSTRAINT,
})
export class PlaylistUserEntity extends BaseEntity {
  static PLAYLIST_DEVICE_CONSTRAINT =
    'playlist_user_entity_playlist_id_user_device_id_unique'

  @Field(() => PlaylistEntity)
  @ManyToOne(() => PlaylistEntity)
  playlist!: PlaylistEntity

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  user!: UserEntity

  @Field()
  @ManyToOne(() => UserDeviceEntity)
  userDevice!: UserDeviceEntity
}
