import { Injectable } from '@nestjs/common'
import sendgrid from '@sendgrid/mail'
import { classToPlain } from 'class-transformer'
import { configService } from 'src/config/config.service'
import { MailTemplate } from './mailtemplate'

@Injectable()
export class MailsService {
  constructor() {
    sendgrid.setApiKey(configService.getSendgridApiKey())
  }

  async sendMail(template: MailTemplate, to: string) {
    const [res] = await sendgrid.send({
      to,
      from: configService.getSendgridSender(),
      subject: template.subject,
      templateId: template.templateId,
      dynamicTemplateData: classToPlain(template),
    })
    console.log(res)
  }
}
