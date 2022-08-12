import { Controller, Get, Param } from '@nestjs/common';
import { PostsDto } from './dto/posts.dto';
import { Posts } from './model/posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  async getPost(@Param() { id }: PostsDto): Promise<Posts> {
    const post = await this.postsService.getPostById(id);

    return await post;
  }
}
