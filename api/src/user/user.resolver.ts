import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Args, Resolver, Query } from '@nestjs/graphql'
import { UserEntity } from 'src/entities/user.entity'

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  @Query(() => UserEntity)
  async userById(@Args('id') id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ id })
  }
}
