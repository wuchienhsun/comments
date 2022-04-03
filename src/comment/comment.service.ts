import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}
  createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.save({ ...createCommentDto, upvotes: 0 });
  }
  findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async updateUpvote(id: number): Promise<void> {
    //  get comment and increment upvotes
    await this.commentRepository.increment({ id }, 'upvotes', 1);
  }

  async removeComment(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
