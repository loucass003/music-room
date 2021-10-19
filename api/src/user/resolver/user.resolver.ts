import { QueryService, InjectQueryService } from '@nestjs-query/core'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { ConversationService } from 'src/chat/conversation.service'
import { UpdateUserDto } from '../dto/updateuser.dto'
import { UserDto } from '../dto/user.dto'
import { UserEntity } from '../entity/user.entity'

@Resolver(() => UserDto)
export class UserResolver extends CRUDResolver(UserDto, {
  create: { disabled: true },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateUserDto,
    guards: [new AuthGuard()],
  },
  delete: { disabled: true },
}) {
  constructor(
    @InjectQueryService(UserEntity)
    readonly service: QueryService<UserEntity>,
  ) {
    super(service)
  }
}
