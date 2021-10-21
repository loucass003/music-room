/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BaseEntity } from 'src/base.entity'
import { ConversationEntity } from 'src/chat/entity/conversation.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
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

  @OneToOne(() => ConversationEntity)
  @JoinColumn()
  conversation!: ConversationEntity

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
