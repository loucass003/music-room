import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum LoginStrategy {
  LOCAL,
  GOOGLE,
}

registerEnumType(LoginStrategy, {
  name: 'LoginStrategy',
})

@ObjectType()
export class UserSession {
  @Field()
  public id!: number

  @Field(() => LoginStrategy)
  public loginStrategy!: LoginStrategy
}
