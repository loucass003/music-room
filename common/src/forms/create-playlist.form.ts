import { MaxLength, MinLength } from 'class-validator'

export class CreatePlaylistForm {
  @MaxLength(64)
  @MinLength(1)
  name!: string

  public!: boolean

  everyoneCanEdit!: boolean
}