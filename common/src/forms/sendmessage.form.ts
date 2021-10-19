import { MinLength } from 'class-validator'

export class SendMessageForm {
  @MinLength(1)
  content!: string
}
