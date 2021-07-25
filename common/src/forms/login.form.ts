import { IsEmail, MaxLength, MinLength } from 'class-validator'

export class LoginForm {
  @IsEmail()
  @MaxLength(50)
  email!: string

  @MinLength(8)
  password!: string
}
