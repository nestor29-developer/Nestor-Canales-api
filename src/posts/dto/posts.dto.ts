import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostsDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
