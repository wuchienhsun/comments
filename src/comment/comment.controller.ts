import {
  Controller,
  Post,
  Body,
  Response,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { UpdateUpvoteDto } from './dto/update-upvote.dto';

@Controller('api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('v1/comments')
  async getComments(@Response() res) {
    try {
      const comments = await this.commentService.findAll();
      res.status(HttpStatus.OK).json({ status: 'success', data: comments });
    } catch (error) {
      console.log('err', error);
      res.status(HttpStatus.BAD_REQUEST).json({ status: 'error' });
    }
  }
  @Post('v1/comment')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Response() res,
  ) {
    try {
      await this.commentService.createComment(createCommentDto);
      res.status(HttpStatus.CREATED).json({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json({ status: 'error' });
    }
  }

  @Post('v1/comment/upvote')
  async updateUpvote(
    @Body() updateUpvoteDto: UpdateUpvoteDto,
    @Response() res,
  ) {
    try {
      await this.commentService.updateUpvote(updateUpvoteDto.commentId);
      res.status(HttpStatus.CREATED).json({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json({ status: 'error' });
    }
  }
}