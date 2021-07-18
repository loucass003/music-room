/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsSelfMiddleware } from '../util/isself.middleware'
import { BaseEntity } from './base.entity'

@Entity()
@ObjectType()
export class UserEntity extends BaseEntity {
  @Property({ index: true, unique: true })
  @Field()
  name!: string

  @Property({ index: true, unique: true })
  @Field({ middleware: [IsSelfMiddleware] })
  email!: string

  /** Password hash */
  @Property({ nullable: true })
  password?: string

  @Property({ index: true, nullable: true, unique: true })
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
}
