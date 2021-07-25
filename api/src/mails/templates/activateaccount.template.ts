import { MailTemplate } from '../mailtemplate'

export class ActivateAccountTemplate extends MailTemplate {
  templateId = 'd-47ca934cf01d4699ba6e577d5854ff5c'

  constructor(
    subject: string,
    public username: string,
    public activationUrl: string,
  ) {
    super(subject)
  }
}
