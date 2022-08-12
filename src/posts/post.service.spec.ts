import { Posts } from './model/posts.interface';
import { PostNotFoundException } from './posts.exception';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  const postDataMock: Posts = {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  };

  beforeEach(async () => {
    postsService = new PostsService();
  });

  describe('Get post by id', () => {
    it('finds a post with id', async () => {
      const result = await postsService.getPostById(1);

      expect(result).toEqual(postDataMock);
    });

    it('fail finds a post with id', async () => {
      try {
        await postsService.getPostById(20);
      } catch (error) {
        expect(error.constructor).toBe(PostNotFoundException);
      }
    });
  });
});
