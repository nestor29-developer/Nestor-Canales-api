import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { PostsDto } from './posts.dto';

describe('postsDto', () => {
  const postsDto: PostsDto = {
    id: 1,
  };

  it('does not throw error if id is defined', async () => {
    const errors = await transformAndValidate({
      ...postsDto,
      id: 2,
    });

    expect(errors.length).toBe(0);
  });

  it('throws error if id is not valid', async () => {
    const errors = await transformAndValidate({
      ...postsDto,
      id: 'abc',
    });

    expect(errors.length).toBe(1);
  });

  it('throws error if id is not absent', async () => {
    const errors = await transformAndValidate({
      ...postsDto,
      id: undefined,
    });

    expect(errors.length).toBe(1);
  });
});

function transformAndValidate(payload): Promise<ValidationError[]> {
  return validate(plainToClass(PostsDto, payload));
}
