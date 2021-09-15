import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core'
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Inject } from "@nestjs/common";
import { Resolver } from '@nestjs/graphql';
import { PubSub } from "graphql-subscriptions";
import { AuthGuard } from 'src/auth/auth.guard';
import { ConversationService } from "../conversation.service";
import { ConversationDto } from "../dto/conversation.dto";
import { ConversationEntity } from "../entity/conversation.entity";


@Resolver(() => ConversationDto)
export class ConversationResolver extends CRUDResolver(ConversationDto, {
  create: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
  read: {
    guards: [new AuthGuard(), ]
  },
}) {
  constructor(
    @InjectQueryService(ConversationEntity)
    readonly service: QueryService<ConversationEntity>,
    private readonly conversationService: ConversationService,
    @Inject('PUB_SUB') readonly pubSub: PubSub,
  ) {
    super(service)
  }
}