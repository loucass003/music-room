import { ChangeSettingsForm } from '@music-room/common'
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { Matches, MaxLength } from 'class-validator'

@InputType()
export class UpdateUserDto extends ChangeSettingsForm {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string
}
