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
import { CreateCommentDtoV2 } from './dto/create-comment-v2.dto';

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

  @Get('v2/comments')
  async getCommentsV2(@Response() res) {
    try {
      const comments = await this.commentService.findAll();

      const map = new Map();
      comments.forEach((comment) => {
        if (map.has(comment.id)) {
          map.set(comment.id, [...map.get(comment.id), comment]);
        } else {
          map.set(comment.id, [comment]);
        }
        if (map.has(comment.commentId)) {
          map.set(comment.commentId, [...map.get(comment.commentId), comment]);
        } else if (comment.commentId) {
          map.set(comment.commentId, [comment]);
        }
      });

      const commentsV2 = [];
      map.forEach((value, key) => {
        const subComments = value.filter(
          (comment) => comment.commentId && comment.commentId === key,
        );
        const mainComment = value.filter((comment) => comment.id === key);
        mainComment[0].subComments = subComments;
        if (!mainComment[0].commentId) {
          commentsV2.push(...mainComment);
        }
      });

      res.status(HttpStatus.OK).json({ status: 'success', data: commentsV2 });
    } catch (error) {
      console.log('err', error);
      res.status(HttpStatus.BAD_REQUEST).json({ status: 'error' });
    }
  }
  @Post('v2/comment')
  async createCommentV2(
    @Body() createCommentDtoV2: CreateCommentDtoV2,
    @Response() res,
  ) {
    try {
      await this.commentService.createCommentV2(createCommentDtoV2);
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
