import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, MinLength } from 'class-validator'
import { IsEqualTo } from 'src/util/isequalto.validator'

@InputType()
export class RegisterDto {
  @IsEmail()
  @Field()
  email!: string

  @MinLength(4)
  @Field()
  name!: string

  @MinLength(8)
  @Field()
  password!: string

  @IsEqualTo('password')
  @Field()
  confirmPassword!: string
}
