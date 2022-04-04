import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDtoV2 {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsNotEmpty()
  avatar: string;
  @IsString()
  @IsNotEmpty()
  comment: string;
  @IsNumber()
  @IsOptional()
  commentId: number;
}
