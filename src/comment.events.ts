import { CommentDTO } from './comment.interfaces';

export enum CommentEvents {
  NewComment = 'comments.new',
}

export class NewCommentEvent {
  constructor(public comment: CommentDTO) {}
}
