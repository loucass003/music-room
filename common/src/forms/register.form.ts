import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator'
import { IsEqualTo } from '../validators/isequalto.validator'

export class RegisterForm {
  @IsEmail()
  @MaxLength(50)
  email!: string

  @MinLength(4)
  @MaxLength(16)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'name can only contain letters, numbers, hyphens and underscores',
  })
  name!: string

  @MinLength(8)
  password!: string

  @IsEqualTo('password')
  confirmPassword!: string
}
