/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Column, Entity, Index, ManyToOne, Unique } from 'typeorm'
import { BaseEntity } from '../../base.entity'
// import { PlaylistEntity } from './playlist.entity'
// import { PlaylistUserEntity } from './playlistuser.entity'
import { UserEntity } from './user.entity'

@Entity()
@Unique(UserDeviceEntity.USER_NAME_UNIQUE_CONSTRAINT, ['user', 'name'])
@Index(['user', 'name']) // tuple (user,name) should index the table
export class UserDeviceEntity extends BaseEntity {
  static USER_NAME_UNIQUE_CONSTRAINT = 'user_device_entity_user_id_name_unique'

  @ManyToOne(() => UserEntity)
  user!: UserEntity

  @Column()
  name!: string

  @Column()
  secret!: string

  // @OneToMany(() => PlaylistUserEntity, p => p.userDevice)
  // invitedPlaylistUsers = new Collection<PlaylistUserEntity>(this)

  // @OneToMany(() => PlaylistEntity, p => p.ownerDevice)
  // ownPlaylists = new Collection<PlaylistEntity>(this)
}
