import { QueryService, InjectQueryService } from '@nestjs-query/core'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Resolver } from '@nestjs/graphql'
import { UserDto } from '../dto/user.dto'
import { UserEntity } from '../entity/user.entity'

@Resolver(() => UserDto)
export class UserResolver extends CRUDResolver(UserDto, {
  create: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
}) {
  constructor(
    @InjectQueryService(UserEntity)
    readonly service: QueryService<UserEntity>,
  ) {
    super(service)
  }
}
