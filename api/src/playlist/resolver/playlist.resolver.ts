import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core'
import {
  AuthorizerInterceptor,
  CRUDResolver,
  DeleteOneInputType,
  HookInterceptor,
  HookTypes,
  MutationArgsType,
  OperationGroup,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql'
import {
  AuthorizerFilter,
  MutationHookArgs,
  ResolverMutation,
} from '@nestjs-query/query-graphql/dist/src/decorators'
import { Inject, UseGuards } from '@nestjs/common'
import {
  Args,
  ArgsType,
  ID,
  Int,
  Mutation,
  ObjectType,
  PartialType,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentSession } from 'src/auth/currentsession.decorator'
import { UserSession } from 'src/auth/session'
import { CreatePlaylistDto, UpdatePlaylistDto } from '../dto/createplaylist.dto'
import { PlaylistDto } from '../dto/playlist.dto'
import {
  PlaylistDeleteEventDto,
  PlaylistEntryAddEventDto,
  PlaylistEntryMoveEventDto,
  PlaylistEntryRemoveEventDto,
  PlaylistEventDto,
  PlaylistInviteEventDto,
  PlaylistUpdateEventDto,
} from '../dto/playlistevent.dto'
import { PlaylistEntity } from '../entity/playlist.entity'
import { PlaylistService } from '../playlist.service'

@ObjectType('PlaylistDeleteResponse')
class DeleteOneResponse extends PartialType(PlaylistDto, ObjectType) {}
@ArgsType()
class DeleteOneInput extends MutationArgsType(
  DeleteOneInputType(PlaylistDto),
) {}
@ArgsType()
class UpdateOneInput extends MutationArgsType(
  UpdateOneInputType(PlaylistDto, UpdatePlaylistDto),
) {}

@Resolver(() => PlaylistDto)
export class PlaylistResolver extends CRUDResolver(PlaylistDto, {
  create: {
    CreateDTOClass: CreatePlaylistDto,
    guards: [new AuthGuard()],
    many: { disabled: true },
  },
  update: {
    UpdateDTOClass: UpdatePlaylistDto,
    guards: [new AuthGuard()],
    many: { disabled: true },
  },
  delete: { disabled: true },
  read: {},
  aggregate: { disabled: true },
}) {
  constructor(
    @InjectQueryService(PlaylistEntity)
    readonly service: QueryService<PlaylistEntity>,
    private readonly playlistService: PlaylistService,
    @Inject('PUB_SUB') readonly pubSub: PubSub,
  ) {
    super(service)
  }

  @Subscription(() => PlaylistEventDto, {
    filter: (payload, variables) => payload.playlistId == variables.playlist,
    resolve: data => data,
  })
  @UseGuards(new AuthGuard())
  async playlistEvents(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: string,
  ) {
    await this.service.query({
      filter: {
        id: { eq: playlist },
        or: [
          { public: { eq: true } },
          { ownerDeviceId: { eq: session.deviceId } },
          { playlistUsers: { id: { eq: session.deviceId } } },
        ],
      },
    })

    return this.pubSub.asyncIterator(['playlistEvent'])
  }

  @ResolverMutation(
    () => PlaylistDto,
    { name: 'updateOnePlaylist' },
    {
      interceptors: [
        HookInterceptor(
          HookTypes.BEFORE_UPDATE_ONE,
          UpdatePlaylistDto,
          PlaylistDto,
        ),
        AuthorizerInterceptor(PlaylistDto),
      ],
    },
    {},
    {},
  )
  @UseGuards(new AuthGuard())
  async updateOne(
    @MutationHookArgs() input: UpdateOneInput,
    @AuthorizerFilter({
      operationGroup: OperationGroup.UPDATE,
      many: false,
    })
    authorizeFilter?: Filter<PlaylistDto>,
  ): Promise<PlaylistDto> {
    const { id, update } = input.input
    const updateResult = await this.service.updateOne(id, update, {
      filter: authorizeFilter ?? {},
    })
    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistUpdateEventDto({
        playlistId: id as string,
        ...input.input.update,
      }),
    )
    return updateResult
  }

  @ResolverMutation(
    () => DeleteOneResponse,
    { name: 'deleteOnePlaylist' },
    {},
    {
      interceptors: [
        HookInterceptor(HookTypes.BEFORE_DELETE_ONE, PlaylistDto),
        AuthorizerInterceptor(PlaylistDto),
      ],
    },
    {},
  )
  @UseGuards(new AuthGuard())
  async deleteOne(
    @MutationHookArgs() input: DeleteOneInput,
    @AuthorizerFilter({
      operationGroup: OperationGroup.DELETE,
      many: false,
    })
    authorizeFilter?: Filter<PlaylistDto>,
  ): Promise<Partial<PlaylistDto>> {
    const deletedResponse = await this.service.deleteOne(input.input.id, {
      filter: authorizeFilter ?? {},
    })
    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistDeleteEventDto({
        playlistId: input.input.id as string,
      }),
    )
    return deletedResponse
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistInvite(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: string,
    @Args('device', { type: () => ID }) device: string,
  ) {
    const d = await this.playlistService.playlistInvite(
      session,
      playlist,
      device,
    )

    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistInviteEventDto({
        playlistId: playlist,
        deviceId: d.id,
        deviceName: d.name,
        userId: d.user.id,
        userName: d.user.name,
      }),
    )
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistKick(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: string,
    @Args('device', { type: () => ID }) device: string,
  ) {
    const d = await this.playlistService.playlistKick(session, playlist, device)

    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistInviteEventDto({
        playlistId: playlist,
        deviceId: d.id,
        deviceName: d.name,
        userId: d.user.id,
        userName: d.user.name,
      }),
    )
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async playlistEntryMove(
    @CurrentSession() session: UserSession,
    @Args('playlist', { type: () => ID }) playlist: string,
    @Args('index', { type: () => Int }) index: number,
    @Args('newIndex', { type: () => Int }) newIndex: number,
  ) {
    await this.playlistService.playlistEntryMove(
      session,
      playlist,
      index,
      newIndex,
    )
    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistEntryMoveEventDto({
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
    @Args('playlist', { type: () => ID }) playlist: string,
    @Args('index', { type: () => Int }) index: number,
  ) {
    await this.playlistService.playlistEntryRemove(session, playlist, index)

    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistEntryRemoveEventDto({
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
    @Args('playlist', { type: () => ID }) playlist: string,
    @Args('youtubeId') youtubeId: string, // todo validate youtube ID
    @Args('name') name: string, // todo validate youtube ID
  ) {
    await this.playlistService.playlistEntryAdd(
      session,
      playlist,
      youtubeId,
      name,
    )

    await this.pubSub.publish(
      'playlistEvent',
      new PlaylistEntryAddEventDto({
        playlistId: playlist,
        youtubeId,
      }),
    )
    return true
  }
}
