import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { User } from '.prisma/client'; 

describe('RelationshipService', () => {
  
  let userService: UserService;
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    
    userService = module.get<UserService>(UserService);
  });

  describe('Followers List', () => {
    it('should return a list of followers for a user', async () => {
      const userId = 1;

      // Simular a função getFollowers no UserService para retornar uma lista de usuários seguidores
      userService.getFollowers = jest.fn().mockResolvedValue([
        { id: 2, username: 'follower1' },
        { id: 3, username: 'follower2' },
      ]);

      const followers: User[] = await userService.getFollowers(userId);

      expect(followers).toHaveLength(2);
      expect(followers[0].username).toBe('follower1');
      expect(followers[1].username).toBe('follower2');
    });
  });

  describe('Following list', () => {
    it('should return a list of users the user is following', async () => {
      const userId = 1;

      // Simular a função getFollowing no UserService para retornar uma lista de usuários seguidos
      userService.getFollowing = jest.fn().mockResolvedValue([
        { id: 2, username: 'following1' },
        { id: 3, username: 'following2' },
      ]);

      const following: User[] = await userService.getFollowing(userId);

      expect(following).toHaveLength(2);
      expect(following[0].username).toBe('following1');
      expect(following[1].username).toBe('following2');
    });
  });
});