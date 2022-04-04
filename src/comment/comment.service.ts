import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { CreateCommentDtoV2 } from './dto/create-comment-v2.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class CommentService {
  ttl: number;
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.ttl = 60 * 60; // 1 hour
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.save({
      ...createCommentDto,
      upvotes: 0,
    });
    const comments = await this.findAll();
    comments.push(comment);
    await this.cacheManager.set('comments', comments, { ttl: this.ttl });
    return comment;
  }

  async createCommentV2(
    createCommentDtoV2: CreateCommentDtoV2,
  ): Promise<Comment> {
    const comment = await this.commentRepository.save({
      ...createCommentDtoV2,
      upvotes: 0,
    });
    const comments = await this.findAll();
    comment.timestamp = Date.now();
    comments.push(comment);
    await this.cacheManager.set('comments', comments, { ttl: this.ttl });
    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.cacheManager.get<Comment[]>('comments');
    if (comments) {
      return comments;
    } else {
      // find and cache
      const comments = await this.commentRepository.find();
      await this.cacheManager.set('comments', comments, { ttl: this.ttl });
      return comments;
    }
  }

  async updateUpvote(id: number): Promise<void> {
    // get comment and increment upvotes and update cache
    await this.commentRepository.increment({ id }, 'upvotes', 1);
    const comments = await this.findAll();
    comments.map((comment) =>
      comment.id === id ? (comment.upvotes += 1) : comment,
    );
    await this.cacheManager.set('comments', comments, { ttl: this.ttl });
  }

  async removeComment(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
