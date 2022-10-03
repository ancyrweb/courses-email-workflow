import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CommentDTO } from './comment.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addComment(@Body() data: CommentDTO) {
    return this.appService.addComment(data);
  }
}
