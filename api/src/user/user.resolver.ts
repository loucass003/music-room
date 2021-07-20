import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Args, Resolver, Query, ID, Info } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { UserEntity } from 'src/entities/user.entity'
import fieldsToRelations from 'graphql-fields-to-relations'

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  @Query(() => UserEntity)
  async userById(
    @Args('id', { type: () => ID }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ id }, fieldsToRelations(info))
  }
}
