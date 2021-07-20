import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Matches, MaxLength } from 'class-validator'

export class CreatePlaylistForm {
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'name can only contain letters, numbers, hyphens and underscores',
  })
  name!: string

  public!: boolean

  everyoneCanEdit!: boolean
}

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
export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {}
