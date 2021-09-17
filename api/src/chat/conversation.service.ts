import { ApiError, ApiErrors } from '@music-room/common'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/entity/user.entity'
import { Repository } from 'typeorm'
import {
  ConversationEntity,
  ConversationType,
} from './entity/conversation.entity'
import { MessageEntity } from './entity/message.entity'

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createConversation(type: ConversationType, members: UserEntity[]) {
    const conversation = await this.conversationRepository.insert({
      type,
      members,
    })
    return conversation
  }

  async sendMessage(authorId: string, conversationId: string, content: string) {
    const author = await this.userRepository.findOne({ id: authorId })
    if (!author) {
      throw new NotFoundException(
        new ApiError(ApiErrors.USER_NOT_FOUND, 'author not found'),
      )
    }

    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['members'],
    })
    if (!conversation) {
      throw new NotFoundException(
        new ApiError(
          ApiErrors.CONVERSATION_NOT_FOUND,
          'conversation not found',
        ),
      )
    }

    if (!conversation.members.find(({ id }) => id === authorId)) {
      throw new UnauthorizedException(
        new ApiError(
          ApiErrors.CONVERSATION_NOT_A_MEMBER,
          'the author is not a member of the conversation',
        ),
      )
    }

    const message = new MessageEntity()
    message.author = author
    message.conversation = conversation
    message.content = content

    await this.messageRepository.save(message)

    return message
  }
}
