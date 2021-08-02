import { CRUDResolver } from '@nestjs-query/query-graphql'
import { Resolver } from '@nestjs/graphql'
import { PlaylistUserDto } from '../dto/playlistuser.dto'

@Resolver()
export class PlaylistUserResolver extends CRUDResolver(PlaylistUserDto, {
  create: {
    disabled: true,
  },
  update: {
    disabled: true,
  },
  delete: { disabled: true },
  read: { many: { disabled: true } },
  aggregate: { disabled: true },
}) {}
