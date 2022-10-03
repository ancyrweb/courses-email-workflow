import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { EmailService, SendEmailData } from './email.service';

// We create an intermediary type EmailJob in case our EmailProcessor
// needs more information than the actual e-mail service.
// Just a level of indirection for now.
export type EmailJob = SendEmailData;
export const createEmailJob = (data: EmailJob): EmailJob => data;

@Processor('emails')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process()
  processEmail(job: Job<EmailJob>) {
    return this.emailService.send(job.data);
  }
}
