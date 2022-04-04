import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { Comment } from './comment/comment.entity';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [Comment],
      // synchronize: true,
    }),
    CommentModule,
    EventsModule,
  ],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService, EventsGateway],
})
export class AppModule {}
