import { ResetPasswordForm } from '@music-room/common'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ResetPasswordDto extends ResetPasswordForm {
  @Field()
  id!: string

  @Field()
  token!: string

  @Field()
  password!: string

  @Field()
  confirmPassword!: string
}
