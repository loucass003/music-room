import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator'
import { IsEqualTo } from '../../util/isequalto.validator'

@InputType()
export class RegisterDto {
  @IsEmail()
  @MaxLength(50)
  @Field()
  email!: string

  @MinLength(4)
  @MaxLength(16)
  @Matches(/^[a-zA-Z0-9_-]+$/)
  @Field()
  name!: string

  @MinLength(8)
  @Field()
  password!: string

  @IsEqualTo('password')
  @Field()
  confirmPassword!: string
}
