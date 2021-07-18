import { PrimaryKey, Property } from '@mikro-orm/core'

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number

  @Property({ columnType: 'timestamptz' })
  createdAt: Date = new Date()

  @Property({ columnType: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
