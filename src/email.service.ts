import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export type SendEmailData = {
  subject: string;
  from: string;
  to: string;
  body: string;
};

@Injectable()
export class EmailService {
  private transport: Mail;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'localhost',
      port: 7002,
    });
  }

  async send(data: SendEmailData) {
    return this.transport.sendMail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: data.body,
    });
  }
}
