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
  public id!: number

  @Field({ nullable: true })
  public deviceName?: string

  @Field(() => ID, { nullable: true })
  public deviceId?: number

  @Field(() => LoginStrategy)
  public loginStrategy!: LoginStrategy
}
