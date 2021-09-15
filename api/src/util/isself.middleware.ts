import { ApiError, ApiErrors } from '@music-room/common'
import { ForbiddenException, UnauthorizedException } from '@nestjs/common'
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'
import { UserSession } from 'src/auth/session'

function getUserSession(context: any): UserSession | undefined {
  return context.req.user
}

export const IsSelfMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const session = getUserSession(ctx.context)
  if (!session)
    throw new UnauthorizedException(
      new ApiError(
        ApiErrors.UNAUTHORIZED_FIELD,
        `cannot access field ${ctx.info.path.typename}.${ctx.info.path.key} without being logged`,
      ),
    )

  if (session.id !== ctx.source.id)
    throw new ForbiddenException(
      new ApiError(
        ApiErrors.UNAUTHORIZED_FIELD,
        `cannot access field ${ctx.info.path.typename}.${ctx.info.path.key} from another account`,
      ),
    )

  const value = await next()
  return value
}
