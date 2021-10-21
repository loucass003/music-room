import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { Matches, MaxLength } from 'class-validator'
import { CreatePlaylistForm } from '@music-room/common'

// export class UpdatePlaylistForm extends PartialType(CreatePlaylistForm) {}

@InputType()
export class CreatePlaylistDto extends CreatePlaylistForm {
  @Field()
  name!: string

  @Field()
  public!: boolean

  @Field()
  everyoneCanEdit!: boolean
}

@InputType()
export class UpdatePlaylistDto extends OmitType(
  PartialType(CreatePlaylistDto),
  ['name'],
) {}
