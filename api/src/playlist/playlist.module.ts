import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PlaylistEntity } from 'src/entities/playlist.entity'
import { PlaylistUserEntity } from 'src/entities/playlistuser.entity'
import { UserDeviceEntity } from 'src/entities/userdevice.entity'
import { PlaylistResolver } from './playlist.resolver'

@Module({
  imports: [
    MikroOrmModule.forFeature([
      PlaylistEntity,
      PlaylistUserEntity,
      UserDeviceEntity,
    ]),
  ],
  providers: [PlaylistResolver],
})
export class PlaylistModule {}
