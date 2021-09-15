import { BaseEntity } from "src/base.entity";
import { PlaylistEntity } from "src/playlist/entity/playlist.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, ManyToMany, OneToOne } from "typeorm";


export enum ConversationType {
  USER,
  PLAYLIST
}

@Entity()
export class ConversationEntity extends BaseEntity {

  @Column({ type: 'enum', enum: ConversationType })
  type!: ConversationType

  @OneToOne(() => PlaylistEntity, playlist => playlist.conversation, { nullable: true })
  playlist?: PlaylistEntity

  @ManyToMany(() => UserEntity, u => u.conversations)
  members!: UserEntity[]
}