import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@Entity()
@ObjectType()
export class UserEntity extends BaseEntity {
  @Property({ index: true })
  @Field()
  name!: string

  @Property({ index: true })
  @Field()
  email!: string

  /** Password hash */
  @Property({ nullable: true })
  password?: string

  @Property({ index: true, nullable: true })
  googleId?: string

  @Field() // todo isself middleware
  get hasPassword(): boolean {
    return this.password !== null
  }

  @Field() // todo isself middleware
  get isGoogleLinked(): boolean {
    return this.googleId !== null
  }
}
