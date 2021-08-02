import { FilterableField, IDField } from '@nestjs-query/query-graphql'
import { ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class BaseDto {
  @IDField(() => ID, { allowedComparisons: ['eq', 'in', 'and', 'or'] })
  id!: string

  @FilterableField()
  createdAt!: Date

  @FilterableField()
  updatedAt!: Date
}
