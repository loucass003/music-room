import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Args, Resolver, Query, ID } from '@nestjs/graphql'
import { UserEntity } from 'src/entities/user.entity'

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  @Query(() => UserEntity)
  async userById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ id })
  }
}
