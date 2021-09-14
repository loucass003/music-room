import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserSession } from './session'

@Injectable()
export class AuthGuard implements CanActivate {
  private options: { deviceMustBeLogged: boolean }

  constructor(options?: { deviceMustBeLogged: boolean }) {
    const { deviceMustBeLogged = true } = options || {}
    this.options = { deviceMustBeLogged }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext()
    request.body = ctx.getArgs()
    request.user = request.req.user
    const session: UserSession | undefined = request.req.user
    if (!request.req.isAuthenticated())
      throw new UnauthorizedException('You must be logged in')
    if (this.options.deviceMustBeLogged && !session?.deviceName)
      throw new UnauthorizedException('Your device must be logged in')

    return true
  }
}
