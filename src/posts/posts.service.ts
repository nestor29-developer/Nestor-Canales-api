import { Injectable } from '@nestjs/common';
import { Posts } from './model/posts.interface';
import { PostNotFoundException } from './posts.exception';
import { data } from './data/posts.data';

@Injectable()
export class PostsService {
  posts: Posts[] = data;

  async getPostById(id: number): Promise<Posts> {
    const post = this.posts.find((e) => e.id == id);

    if (!post) {
      throw new PostNotFoundException(id);
    }

    return <Posts>await post;
  }
}
