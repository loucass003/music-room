import { MaxLength } from 'class-validator'

export class SendMessageForm {
  @MaxLength(500)
  content!: string
}
