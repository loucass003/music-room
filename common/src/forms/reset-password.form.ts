import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { IsEqualTo } from '../validators/isequalto.validator'

export class ResetPasswordForm {
  @MinLength(8)
  password!: string

  @IsEqualTo('password')
  confirmPassword!: string
}


export class SendResetPasswordForm {
  @IsEmail()
  @MaxLength(50)
  email!: string
}