import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
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
    if (this.options.deviceMustBeLogged && !session?.deviceName) return false
    return request.req.isAuthenticated()
  }
}
