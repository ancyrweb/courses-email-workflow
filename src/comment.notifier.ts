import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';

import { CommentEvents, NewCommentEvent } from './comment.events';
import { CommentEmailGenerator } from './comment.email-generator';
import { createEmailJob } from './email.processor';

@Injectable()
export class CommentNotifier {
  constructor(
    @InjectQueue('emails') private readonly emailQueue: Queue,
    private readonly emailGenerator: CommentEmailGenerator,
  ) {}

  @OnEvent(CommentEvents.NewComment)
  onNewEvent(data: NewCommentEvent) {
    const body = this.emailGenerator.generateCommentEmail(data.comment);
    return this.emailQueue.add(
      createEmailJob({
        subject: 'You received a new comment',
        from: 'author@website.com',
        to: 'receiver@website.com',
        body,
      }),
    );
  }
}
