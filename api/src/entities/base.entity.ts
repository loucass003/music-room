import { PrimaryKey, Property } from '@mikro-orm/core'

export abstract class BaseEntity {
  @PrimaryKey()
  id: string

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date()

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
