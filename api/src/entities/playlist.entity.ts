/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { PlaylistUserEntity } from './playlistuser.entity'
import { UserEntity } from './user.entity'
import { UserDeviceEntity } from './userdevice.entity'

@ObjectType()
@Entity()
export class PlaylistEntity extends BaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  owner!: UserEntity

  @Field()
  @ManyToOne(() => UserDeviceEntity)
  ownerDevice!: UserDeviceEntity

  @Field()
  @Property()
  name!: string

  @Field()
  @Property()
  public: boolean = true

  @Field()
  @Property()
  everyoneCanEdit: boolean = true

  @Field(() => [PlaylistUserEntity])
  @OneToMany(() => PlaylistUserEntity, u => u.playlist)
  playlistUsers = new Collection<PlaylistUserEntity>(this)

  @Field(() => [String])
  @Property()
  entries: string[] = []
}
