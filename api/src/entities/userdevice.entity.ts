/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Collection,
  Entity,
  IdentifiedReference,
  Index,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { PlaylistEntity } from './playlist.entity'
import { PlaylistUserEntity } from './playlistuser.entity'
import { UserEntity } from './user.entity'

@Entity()
@Unique({
  // tuple (user,name) should be unique for the collection
  properties: ['user', 'name'],
  name: UserDeviceEntity.USER_NAME_UNIQUE_CONSTRAINT,
})
@Index({ properties: ['user', 'name'] }) // tuple (user,name) should index the table
@ObjectType()
export class UserDeviceEntity extends BaseEntity {
  static USER_NAME_UNIQUE_CONSTRAINT = 'user_device_entity_user_id_name_unique'

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  user!: IdentifiedReference<UserEntity>

  @Property()
  @Field()
  name!: string

  @Property()
  secret!: string

  @Field(() => [PlaylistUserEntity])
  @OneToMany(() => PlaylistUserEntity, p => p.userDevice)
  invitedPlaylistUsers = new Collection<PlaylistUserEntity>(this)

  @Field(() => [PlaylistEntity])
  @OneToMany(() => PlaylistEntity, p => p.ownerDevice)
  ownPlaylists = new Collection<PlaylistEntity>(this)
}
