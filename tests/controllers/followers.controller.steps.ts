import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../backend/src/user/user.service';
import { PrismaService } from '../../backend/src/prisma/prisma.service';
import { UserModule } from '../../backend/src/user/user.module';

const feature = loadFeature('tests/features/test-followers.feature');

defineFeature(feature, (test) => {
  let userService: UserService;
  let firstUserId: number;
  let secondUserId: number;

  test('User follows another user', ({ given, when, then }) => {
    given('a user with id {int}', async (userId: number) => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [UserModule],
      })
        .overrideProvider(PrismaService)
        .useValue({
          user: {
            findUnique: jest.fn().mockImplementation((params) => {
              if (params.where.id === 1) {
                return { id: 1, following: [] };
              } else if (params.where.id === 2) {
                return { id: 2, followers: [] };
              }
            }),
            update: jest.fn().mockImplementation((params) => {
              if (params.where.id === 1) {
                firstUserId = params.where.id;
                return { ...params.data };
              }
            }),
          },
        })
        .compile();

      userService = module.get<UserService>(UserService);
    });

    when('the first user follows the second user', async () => {
      await userService.addFollower(firstUserId, secondUserId);
    });

    then('the first user should be following the second user', async () => {
      const followers = await userService.getFollowers(secondUserId);
      expect(followers).toContainEqual({ id: firstUserId });
    });

    given('another user with id {int}', (userId: number) => {
      secondUserId = userId;
    });
  });

  test('User unfollows another user', ({ given, when, then }) => {
    given('a user with id {int}', async (userId: number) => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [UserModule],
      })
        .overrideProvider(PrismaService)
        .useValue({
          user: {
            findUnique: jest.fn().mockImplementation((params) => {
              if (params.where.id === 1) {
                return { id: 1, following: [] };
              } else if (params.where.id === 2) {
                return { id: 2, followers: [] };
              }
            }),
            update: jest.fn().mockImplementation((params) => {
              if (params.where.id === 1) {
                firstUserId = params.where.id;
                return { ...params.data };
              }
            }),
          },
        })
        .compile();

      userService = module.get<UserService>(UserService);
    });

    given('another user with id {int}', async (userId: number) => {
      secondUserId = userId;
    });

    given('the first user follows the second user', async () => {
      await userService.addFollower(firstUserId, secondUserId);
    });

    when('the first user unfollows the second user', async () => {
      await userService.removeFollower(firstUserId, secondUserId);
    });

    then('the first user should not be following the second user', async () => {
      const followers = await userService.getFollowers(secondUserId);
      expect(followers).not.toContainEqual({ id: firstUserId });
    });
  });

  test('User views their followers', ({ given, when, then }) => {
    given('a user with id {int}', async (userId: number) => {
      firstUserId = userId;
    });

    given('another user with id {int}', (userId: number) => {
      secondUserId = userId;
    });

    given('the first user follows the second user', async () => {
      await userService.addFollower(firstUserId, secondUserId);
    });

    when('the first user views their list of followers', async () => {
      const followers = await userService.getFollowers(firstUserId);
      expect(followers).toContainEqual({ id: secondUserId });
    });

    then('the list of followers should include the second user', () => {
      // Ja incluso
    });
  });

  test('User views who they are following', ({ given, when, then }) => {
    given('a user with id {int}', async (userId: number) => {
      firstUserId = userId;
    });

    given('another user with id {int}', (userId: number) => {
      secondUserId = userId;
    });

    given('the first user follows the second user', async () => {
      await userService.addFollower(firstUserId, secondUserId);
    });

    when('the first user views their list of following users', async () => {
      const following = await userService.getFollowing(firstUserId);
      expect(following).toContainEqual({ id: secondUserId });
    });

    then('the list of following users should include the second user', () => {
      // Ja incluso
    });
  });





});