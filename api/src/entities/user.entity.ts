import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@Entity()
@ObjectType()
export class UserEntity extends BaseEntity {
  @Property()
  @Field()
  name: string

  @Property()
  @Field()
  password: string
}
