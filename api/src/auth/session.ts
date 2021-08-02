import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum LoginStrategy {
  LOCAL,
  GOOGLE,
}

registerEnumType(LoginStrategy, {
  name: 'LoginStrategy',
})

@ObjectType()
export class UserSession {
  @Field(() => ID)
  public id!: string

  @Field({ nullable: true })
  public deviceName?: string

  @Field(() => ID, { nullable: true })
  public deviceId?: string

  @Field(() => LoginStrategy)
  public loginStrategy!: LoginStrategy
}

export interface AuthorizedCtx {
  req: { user?: UserSession }
}
