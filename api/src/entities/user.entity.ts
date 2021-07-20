/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsSelfMiddleware } from '../util/isself.middleware'
import { BaseEntity } from './base.entity'
import { PlaylistEntity } from './playlist.entity'
import { PlaylistUserEntity } from './playlistuser.entity'
import { UserDeviceEntity } from './userdevice.entity'

@Entity()
@ObjectType()
export class UserEntity extends BaseEntity {
  static NAME_UNIQUE_CONSTRAINT = 'user_entity_name_unique'
  static EMAIL_UNIQUE_CONSTRAINT = 'user_entity_email_unique'

  @Property({ index: true })
  @Unique({ name: UserEntity.NAME_UNIQUE_CONSTRAINT })
  @Field()
  name!: string

  @Property({ index: true })
  @Unique({ name: UserEntity.EMAIL_UNIQUE_CONSTRAINT })
  @Field({ middleware: [IsSelfMiddleware] })
  email!: string

  /** Password hash */
  @Property({ nullable: true })
  password?: string

  @Property({ index: true, nullable: true })
  @Unique()
  googleId?: string

  @Property({ default: false })
  emailValidated: boolean = false

  @Property({ index: true, nullable: true })
  validationCode?: string

  @Field({ middleware: [IsSelfMiddleware] })
  get hasPassword(): boolean {
    return this.password !== null
  }

  @Field({ middleware: [IsSelfMiddleware] })
  get isGoogleLinked(): boolean {
    return this.googleId !== null
  }

  @OneToMany(() => UserDeviceEntity, device => device.user, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
  })
  @Field(() => [UserDeviceEntity], { middleware: [IsSelfMiddleware] })
  devices = new Collection<UserDeviceEntity>(this)

  @Field(() => [PlaylistUserEntity], { middleware: [IsSelfMiddleware] })
  @OneToMany(() => PlaylistUserEntity, p => p.user)
  playlistUsers = new Collection<PlaylistUserEntity>(this)

  @Field(() => PlaylistEntity)
  @OneToMany(() => PlaylistEntity, p => p.owner)
  ownPlaylists = new Collection<PlaylistEntity>(this)
}
