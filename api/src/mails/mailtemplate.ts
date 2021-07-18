import { Exclude } from 'class-transformer'

export abstract class MailTemplate {
  @Exclude()
  public abstract readonly templateId: string
  @Exclude()
  public subject: string

  constructor(subject: string) {
    this.subject = subject
  }
}
