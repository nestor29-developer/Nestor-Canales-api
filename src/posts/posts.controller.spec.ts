import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PostsDto } from './dto/posts.dto';
import { Posts } from './model/posts.interface';
import { PostsController } from './posts.controller';
import { PostNotFoundException } from './posts.exception';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let postsController: PostsController;

  const postDataMock: Posts = {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  };

  const postsServiceMock = {
    getPostById: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(postsServiceMock)
      .compile();

    postsController = moduleRef.get<PostsController>(PostsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPostById', () => {
    it('should list a post with id', async () => {
      const listPostMock = jest
        .spyOn(postsServiceMock, 'getPostById')
        .mockImplementation(() => Promise.resolve(postDataMock));

      const postdto: PostsDto = {
        id: 1,
      };

      const post = await postsController.getPost(postdto);

      expect(post).toEqual(postDataMock);
      expect(listPostMock).toHaveBeenCalled();
    });

    it('fail when a post with not found id', async () => {
      try {
        const postdto: PostsDto = {
          id: 11,
        };

        await postsController.getPost(postdto);
      } catch (error) {
        expect(error.constructor).toBe(PostNotFoundException);
      }
    });
  });
});
