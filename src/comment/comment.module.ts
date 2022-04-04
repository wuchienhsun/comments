import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from 'src/events/events.gateway';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CacheModule.register()],
  providers: [CommentService, EventsGateway],
  controllers: [CommentController],
  exports: [TypeOrmModule],
})
export class CommentModule {}
