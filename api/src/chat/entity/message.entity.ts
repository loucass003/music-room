import { BaseEntity } from 'src/base.entity'
import { UserEntity } from 'src/user/entity/user.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ConversationEntity } from './conversation.entity'

@Entity()
export class MessageEntity extends BaseEntity {
  @ManyToOne(() => ConversationEntity, conversation => conversation.messages)
  conversation!: ConversationEntity

  @Column({ length: 500 })
  content!: string

  @ManyToOne(() => UserEntity)
  author!: UserEntity
}
