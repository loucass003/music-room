import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('PlaylistEntry')
export class PlaylistEntryDto {
  @Field()
  name!: string

  @Field()
  youtubeId!: string
}
