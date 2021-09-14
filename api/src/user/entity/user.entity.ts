/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Column, Entity, Index, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from '../../base.entity'
import { UserDeviceEntity } from './userdevice.entity'

@Entity()
@Unique(UserEntity.NAME_UNIQUE_CONSTRAINT, ['name'])
@Unique(UserEntity.EMAIL_UNIQUE_CONSTRAINT, ['email'])
export class UserEntity extends BaseEntity {
  static NAME_UNIQUE_CONSTRAINT = 'user_entity_name_unique'
  static EMAIL_UNIQUE_CONSTRAINT = 'user_entity_email_unique'

  @Column()
  @Index()
  name!: string

  @Column()
  @Index()
  email!: string

  /** Password hash */
  @Column({ nullable: true })
  password?: string

  @Column({ nullable: true })
  @Index()
  googleId?: string

  @Column({ default: false })
  emailValidated: boolean = false

  @Column({ nullable: true })
  @Index()
  validationCode?: string

  @Column({ nullable: true })
  @Index()
  resetToken?: string

  @Column({ nullable: true })
  @Index()
  resetTokenExpire?: Date

  get hasPassword(): boolean {
    return this.password !== null
  }

  get isGoogleLinked(): boolean {
    return this.googleId !== null
  }

  @OneToMany(() => UserDeviceEntity, device => device.user, {
    cascade: ['remove'],
  })
  devices!: UserDeviceEntity[]

  // @OneToMany(() => PlaylistUserEntity, p => p.user)
  // playlistUsers!: PlaylistUserEntity[]

  // @OneToMany(() => PlaylistEntity, p => p.owner)
  // ownPlaylists!: PlaylistEntity[]
}
