import { MaxLength, MinLength } from 'class-validator'

export class SendMessageForm {
  @MaxLength(500)
  @MinLength(1)
  content!: string
}
