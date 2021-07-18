import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { LoginStrategy, UserSession } from '../session'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<UserSession> {
    const user = await this.authService.validateUser(email, password)
    const session = new UserSession()
    session.id = user.id
    session.loginStrategy = LoginStrategy.LOCAL
    return session
  }
}
