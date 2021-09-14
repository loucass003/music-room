import { Matches, MaxLength, MinLength } from 'class-validator'

export class DeviceForm {
  @MinLength(4)
  @MaxLength(16)
  name!: string
}
