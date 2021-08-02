/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BaseEntity } from 'src/base.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { PlaylistUserEntity } from './playlistuser.entity'

@Entity()
export class PlaylistEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  owner!: UserEntity

  @Column()
  ownerId!: string

  @ManyToOne(() => UserDeviceEntity)
  ownerDevice!: UserDeviceEntity

  @Column()
  ownerDeviceId!: string

  @Column()
  name!: string

  @Column()
  public: boolean = true

  @Column()
  everyoneCanEdit: boolean = true

  @OneToMany(() => PlaylistUserEntity, u => u.playlist)
  playlistUsers!: PlaylistUserEntity[]

  @Column('simple-array')
  entriesYoutubeIds: string[] = []

  @Column('simple-array')
  entriesNames: string[] = []

  get entries(): any {
    return this.entriesYoutubeIds.map((youtubeId, index) => ({
      youtubeId,
      name: this.entriesNames[index],
    }))
  }

  // @BeforeUpdate()
  // @BeforeInsert()
  // handleEntries() {
  //   if (this.entries) {
  //     this.entriesNames = this.entries.map(ent => ent.)
  //   }
  // }
}
