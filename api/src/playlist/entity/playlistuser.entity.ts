/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BaseEntity } from 'src/base.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'
import { Entity, ManyToOne, Unique } from 'typeorm'
import { PlaylistEntity } from './playlist.entity'

@Entity()
@Unique(PlaylistUserEntity.PLAYLIST_DEVICE_CONSTRAINT, [
  'playlist',
  'userDevice',
])
export class PlaylistUserEntity extends BaseEntity {
  static PLAYLIST_DEVICE_CONSTRAINT =
    'playlist_user_entity_playlist_id_user_device_id_unique'

  @ManyToOne(() => PlaylistEntity)
  playlist!: PlaylistEntity

  @ManyToOne(() => UserEntity)
  user!: UserEntity

  @ManyToOne(() => UserDeviceEntity)
  userDevice!: UserDeviceEntity
}
