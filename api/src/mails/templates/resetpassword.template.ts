import { MailTemplate } from '../mailtemplate'

export class ResetPasswordTemplate extends MailTemplate {
  templateId = 'd-31bc21c13cf749b6b8112e6e541a6f4c'

  constructor(
    subject: string,
    public username: string,
    public resetUrl: string,
  ) {
    super(subject)
  }
}
