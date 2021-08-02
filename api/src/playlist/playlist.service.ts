import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UserSession } from 'src/auth/session'
import { UserDeviceEntity } from 'src/user/entity/userdevice.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, QueryFailedError, Repository } from 'typeorm'
import { PlaylistEntity } from './entity/playlist.entity'
import { PlaylistUserEntity } from './entity/playlistuser.entity'

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(PlaylistUserEntity)
    private readonly playlistUserRepository: Repository<PlaylistUserEntity>,
    @InjectRepository(UserDeviceEntity)
    private readonly deviceRepository: Repository<UserDeviceEntity>,
    private readonly em: EntityManager,
  ) {}

  async playlistInvite(
    session: UserSession,
    playlist: string,
    device: string,
  ): Promise<UserDeviceEntity> {
    if (device === session.deviceId)
      throw new BadRequestException('cannot invite yourself in a playlist')

    const [d] = await Promise.all([
      this.deviceRepository.findOneOrFail(device, { relations: ['user'] }),
      this.playlistRepository.findOneOrFail({
        // permission check
        id: playlist,
        ownerDevice: { id: session.deviceId },
      }),
    ])

    try {
      await this.playlistUserRepository.insert({
        playlist: { id: playlist },
        userDevice: d,
        user: { id: d.user.id },
      })
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (
          (e as any).constraint ===
          PlaylistUserEntity.PLAYLIST_DEVICE_CONSTRAINT
        ) {
          return d // already in the playlist
        } else throw e
      } else throw e
    }
    return d
  }

  async playlistKick(
    session: UserSession,
    playlist: string,
    device: string,
  ): Promise<UserDeviceEntity> {
    const [d] = await Promise.all([
      this.deviceRepository.findOneOrFail(device, { relations: ['user'] }),
      this.playlistRepository.findOneOrFail({
        id: playlist,
        // permission check
        ownerDeviceId: session.deviceId,
      }),
    ])

    const count = await this.playlistUserRepository.delete({
      userDevice: { id: device },
      playlist: { id: playlist },
    })
    if (count.affected) throw new NotFoundException('playlist user not found')
    return d
  }

  async playlistEntryMove(
    session: UserSession,
    playlist: string,
    index: number,
    newIndex: number,
  ) {
    await this.em.transaction(async () => {
      const pl = await this.playlistRepository.findOneOrFail({
        id: playlist,
        ownerDeviceId: session.deviceId, // permission check
      })

      if (
        index < 0 ||
        index >= pl.entriesYoutubeIds.length ||
        newIndex < 0 ||
        newIndex >= pl.entriesYoutubeIds.length
      )
        throw new BadRequestException('index out of range')

      {
        const element = pl.entriesNames[index]
        pl.entriesNames.splice(index, 1)
        pl.entriesNames.splice(newIndex, 0, element)
      }
      {
        const element = pl.entriesYoutubeIds[index]
        pl.entriesYoutubeIds.splice(index, 1)
        pl.entriesYoutubeIds.splice(newIndex, 0, element)
      }

      await this.playlistRepository.save(pl)
    })
    return true
  }

  async playlistEntryRemove(
    session: UserSession,
    playlist: string,
    index: number,
  ) {
    await this.em.transaction(async () => {
      const pl = await this.playlistRepository.findOneOrFail({
        id: playlist,
        ownerDeviceId: session.deviceId, // permission check
      })

      if (index < 0 || index >= pl.entriesYoutubeIds.length)
        throw new BadRequestException('index out of range')

      pl.entriesNames.splice(index, 1)
      pl.entriesYoutubeIds.splice(index, 1)

      await this.playlistRepository.save(pl)
    })
    return true
  }

  async playlistEntryAdd(
    session: UserSession,
    playlist: string,
    youtubeId: string, // todo validate youtube ID
    name: string, // todo validate youtube ID
  ) {
    await this.em.transaction(async () => {
      const pl = await this.playlistRepository.findOneOrFail({
        id: playlist,
        ownerDeviceId: session.deviceId, // permission check
      })
      pl.entriesNames.push(name)
      pl.entriesYoutubeIds.push(youtubeId)

      await this.playlistRepository.save(pl)
    })
    return true
  }
}
