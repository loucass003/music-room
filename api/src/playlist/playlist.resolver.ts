import {
  EntityRepository,
  QueryOrder,
  UniqueConstraintViolationException,
} from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Args, Resolver, Query, ID, Info, Mutation } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { UserEntity } from 'src/entities/user.entity'
import fieldsToRelations from 'graphql-fields-to-relations'
import { PlaylistEntity } from 'src/entities/playlist.entity'
import { CurrentSession } from 'src/auth/currentsession.decorator'
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserSession } from 'src/auth/session'
import { PlaylistUserEntity } from 'src/entities/playlistuser.entity'
import { UserDeviceEntity } from 'src/entities/userdevice.entity'
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto/createplaylist.dto'

@Resolver()
export class PlaylistResolver {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: EntityRepository<PlaylistEntity>,
    @InjectRepository(PlaylistUserEntity)
    private readonly playlistUserRepository: EntityRepository<PlaylistUserEntity>,
    @InjectRepository(UserDeviceEntity)
    private readonly deviceRepository: EntityRepository<UserDeviceEntity>,
  ) {}

  @Query(() => [PlaylistEntity])
  async publicPlaylists(@Info() info: GraphQLResolveInfo) {
    const playlists = await this.playlistRepository.findAll({
      orderBy: { createdAt: QueryOrder.DESC },
      populate: fieldsToRelations(info),
    })

    return playlists
  }

  @Mutation(() => ID)
  @UseGuards(new AuthGuard())
  async createPlaylist(
    @CurrentSession() session: UserSession,
    @Args('data') data: CreatePlaylistDto,
  ) {
    const playlist = this.playlistRepository.create({
      ...data,
      owner: session.id,
      ownerDevice: session.deviceId,
    })
    await this.playlistRepository.persistAndFlush(playlist)
    return playlist.id
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async updatePlaylist(
    @CurrentSession() session: UserSession,
    @Args('id', { type: () => ID }) id: number,
    @Args('data') data: UpdatePlaylistDto,
  ) {
    const count = await this.playlistRepository.nativeUpdate(
      {
        id,
        ownerDevice: session.deviceId,
      },
      data,
    )
    if (count == 0) throw new NotFoundException('playlist not found')
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async deletePlaylist(
    @CurrentSession() session: UserSession,
    @Args('id', { type: () => ID }) id: number,
  ) {
    const count = await this.playlistRepository.nativeDelete({
      id,
      ownerDevice: session.deviceId,
    })
    if (count == 0) throw new NotFoundException('playlist not found')
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistInvite(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: number,
    @Args('device', { type: () => ID }) device: number,
  ) {
    if (device === session.deviceId)
      throw new BadRequestException('cannot invite yourself in a playlist')

    const [d] = await Promise.all([
      this.deviceRepository.findOneOrFail(device),
      this.playlistRepository.findOneOrFail({
        // permission check
        id: playlist,
        ownerDevice: session.deviceId,
      }),
    ])

    const entity = this.playlistUserRepository.create({
      playlist,
      userDevice: device,
      user: d.user,
    })

    try {
      await this.deviceRepository.persistAndFlush(entity)
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        if (
          (e as any).constraint ===
          PlaylistUserEntity.PLAYLIST_DEVICE_CONSTRAINT
        ) {
          return true // already in the playlist
        } else throw e
      } else throw e
    }
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistKick(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: number,
    @Args('device', { type: () => ID }) device: number,
  ) {
    await this.playlistRepository.findOneOrFail({
      // permission check
      id: playlist,
      ownerDevice: session.deviceId,
    })

    const count = await this.playlistUserRepository.nativeDelete({
      userDevice: device,
      playlist,
    })
    if (count == 0) throw new NotFoundException('playlist user not found')
    return true
  }
}
