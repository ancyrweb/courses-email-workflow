import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentEmailGenerator } from './comment.email-generator';
import { CommentNotifier } from './comment.notifier';
import { EmailProcessor } from './email.processor';
import { EmailService } from './email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emails',
      redis: {
        host: 'localhost',
        port: 7003,
      },
    }),
    EventEmitterModule.forRoot({}),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CommentEmailGenerator,
    CommentNotifier,
    EmailService,
    EmailProcessor,
  ],
})
export class AppModule {}
