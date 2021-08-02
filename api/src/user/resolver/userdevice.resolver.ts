import { QueryService, InjectQueryService } from '@nestjs-query/core'
import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Resolver } from '@nestjs/graphql'
import { UserDeviceDto } from '../dto/userdevice.dto'
import { UserDeviceEntity } from '../entity/userdevice.entity'

@Resolver(() => UserDeviceDto)
export class UserDeviceResolver extends CRUDResolver(UserDeviceDto, {
  create: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
}) {
  constructor(
    @InjectQueryService(UserDeviceEntity)
    readonly service: QueryService<UserDeviceEntity>,
  ) {
    super(service)
  }
}
