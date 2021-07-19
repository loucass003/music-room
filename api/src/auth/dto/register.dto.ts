import { Field, InputType } from '@nestjs/graphql'
import { RegisterForm } from '@music-room/common'

@InputType()
export class RegisterDto extends RegisterForm {
  @Field()
  email!: string

  @Field()
  name!: string

  @Field()
  password!: string

  @Field()
  confirmPassword!: string
}
