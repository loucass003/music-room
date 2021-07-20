import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Args, Resolver, ID, Mutation, Int } from '@nestjs/graphql'
import { PlaylistEntity } from 'src/entities/playlist.entity'
import { CurrentSession } from 'src/auth/currentsession.decorator'
import { BadRequestException, Inject, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserSession } from 'src/auth/session'
import { PlaylistUserEntity } from 'src/entities/playlistuser.entity'
import { UserDeviceEntity } from 'src/entities/userdevice.entity'
import {
  PlaylistEntryAddEvent,
  PlaylistEntryMoveEvent,
  PlaylistEntryRemoveEvent,
} from './playlistevent'
import { PubSubEngine } from 'graphql-subscriptions'

@Resolver()
export class PlaylistEntryResolver {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: EntityRepository<PlaylistEntity>,
    @InjectRepository(PlaylistUserEntity)
    private readonly playlistUserRepository: EntityRepository<PlaylistUserEntity>,
    @InjectRepository(UserDeviceEntity)
    private readonly deviceRepository: EntityRepository<UserDeviceEntity>,
    private readonly em: EntityManager,
    @Inject('PUB_SUB') private readonly pubSub: PubSubEngine,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistEntryMove(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: number,
    @Args('index', { type: () => Int }) index: number,
    @Args('newIndex', { type: () => Int }) newIndex: number,
  ) {
    await this.em.transactional(async () => {
      const pl = await this.playlistRepository.findOneOrFail({
        id: playlist,
        ownerDevice: session.deviceId, // permission check
      })

      if (
        index < 0 ||
        index >= pl.entries.length ||
        newIndex < 0 ||
        newIndex >= pl.entries.length
      )
        throw new BadRequestException('index out of range')

      const element = pl.entries[index]
      pl.entries.splice(index, 1)
      pl.entries.splice(newIndex, 0, element)

      await this.playlistRepository.persistAndFlush(pl)
    })

    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistEntryMoveEvent({
        playlistId: playlist,
        index,
        newIndex,
      }),
    )
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistEntryRemove(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: number,
    @Args('index', { type: () => Int }) index: number,
  ) {
    await this.em.transactional(async () => {
      const pl = await this.playlistRepository.findOneOrFail({
        id: playlist,
        ownerDevice: session.deviceId, // permission check
      })

      if (index < 0 || index >= pl.entries.length)
        throw new BadRequestException('index out of range')

      pl.entries.splice(index, 1)

      await this.playlistRepository.persistAndFlush(pl)
    })

    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistEntryRemoveEvent({
        playlistId: playlist,
        index,
      }),
    )
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistEntryAdd(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: number,
    @Args('youtubeId') youtubeId: string, // todo validate youtube ID
  ) {
    await this.em.transactional(async () => {
      const pl = await this.playlistRepository.findOneOrFail({
        id: playlist,
        ownerDevice: session.deviceId, // permission check
      })
      pl.entries.push(youtubeId)

      await this.playlistRepository.persistAndFlush(pl)
    })

    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistEntryAddEvent({
        playlistId: playlist,
        youtubeId,
      }),
    )
    return true
  }
}
