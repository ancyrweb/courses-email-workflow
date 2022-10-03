import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentEvents, NewCommentEvent } from './comment.events';

import { CommentDTO } from './comment.interfaces';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  addComment(data: CommentDTO) {
    // First we validate and save our comment inside a database
    // We'll skip that part inside this exemple.

    // Then we emit the event that a new comment has been added
    // note that we use emitAsync to avoid blocking the thread
    this.eventEmitter.emitAsync(
      CommentEvents.NewComment,
      new NewCommentEvent(data),
    );

    // Then our work is done, we return here.
    return {
      done: true,
    };
  }
}
