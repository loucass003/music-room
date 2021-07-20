import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PlaylistEntity } from 'src/entities/playlist.entity'
import { PlaylistUserEntity } from 'src/entities/playlistuser.entity'
import { UserDeviceEntity } from 'src/entities/userdevice.entity'
import { PlaylistResolver } from './playlist.resolver'
import { PubSub } from 'graphql-subscriptions'
import { PlaylistEntryResolver } from './playlistentry.resolver'

@Module({
  imports: [
    MikroOrmModule.forFeature([
      PlaylistEntity,
      PlaylistUserEntity,
      UserDeviceEntity,
    ]),
  ],
  providers: [
    PlaylistResolver,
    PlaylistEntryResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class PlaylistModule {}
