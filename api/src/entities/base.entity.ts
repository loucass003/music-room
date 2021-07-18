import { PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  @Field(() => ID)
  id!: number

  @Property({ columnType: 'timestamptz' })
  @Field()
  createdAt: Date = new Date()

  @Property({ columnType: 'timestamptz', onUpdate: () => new Date() })
  @Field()
  updatedAt: Date = new Date()
}
