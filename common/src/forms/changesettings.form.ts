import { IsEmail, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class ChangeSettingsForm {
  @IsOptional()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message: 'name can only contain letters, numbers, hyphens and underscores',
  })
  name?: string

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string
}