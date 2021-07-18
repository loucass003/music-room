import { MailTemplate } from '../mailtemplate'

export class ActivateAccountTemplate extends MailTemplate {
  templateId = 'd-1900502630f64615931370349c16a493'

  constructor(
    subject: string,
    public username: string,
    public activationUrl: string,
  ) {
    super(subject)
  }
}
