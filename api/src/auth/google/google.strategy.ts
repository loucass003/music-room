import { Strategy } from 'passport-google-oauth20'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { LoginStrategy, UserSession } from '../session'
import { configService } from 'src/config/config.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: configService.getGoogleClientKeys().id,
      clientSecret: configService.getGoogleClientKeys().secret,
      callbackURL: '/auth/google/redirect',
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<UserSession> {
    const user = await this.authService.loginUserWithGoogle(
      accessToken,
      refreshToken,
      profile,
    )

    const session = new UserSession()
    session.id = user.id
    session.loginStrategy = LoginStrategy.GOOGLE

    return session
  }
}
