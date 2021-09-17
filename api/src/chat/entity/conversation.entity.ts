import { BaseEntity } from 'src/base.entity'
import { PlaylistEntity } from 'src/playlist/entity/playlist.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { MessageEntity } from './message.entity'

export enum ConversationType {
  USER,
  PLAYLIST,
}

@Entity()
export class ConversationEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ConversationType })
  type!: ConversationType

  @OneToOne(() => PlaylistEntity, playlist => playlist.conversation, {
    nullable: true,
  })
  playlist?: PlaylistEntity

  @ManyToMany(() => UserEntity, user => user.conversations)
  @JoinTable({ name: 'conversation_members' })
  members!: UserEntity[]

  @OneToMany(() => MessageEntity, message => message.conversation)
  messages?: MessageEntity[]
}
