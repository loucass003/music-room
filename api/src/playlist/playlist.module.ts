import {
  NestjsQueryGraphQLModule,
  pubSubToken,
} from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'
import { PlaylistDto } from './dto/playlist.dto'
import { PlaylistUserDto } from './dto/playlistuser.dto'
import { PlaylistEntity } from './entity/playlist.entity'
import { PlaylistUserEntity } from './entity/playlistuser.entity'
import { PlaylistService } from './playlist.service'
import { PlaylistResolver } from './resolver/playlist.resolver'
import { PlaylistUserResolver } from './resolver/playlistentry.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          PlaylistEntity,
          PlaylistUserEntity,
          UserDeviceEntity,
        ]),
      ],
      dtos: [{ DTOClass: PlaylistUserDto }, { DTOClass: PlaylistDto }],
    }),
  ],
  providers: [
    PlaylistService,
    PlaylistResolver,
    PlaylistUserResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class PlaylistModule {}
