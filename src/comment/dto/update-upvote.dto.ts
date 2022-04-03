import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateUpvoteDto {
  @IsNumber()
  @IsNotEmpty()
  commentId: number;
}
