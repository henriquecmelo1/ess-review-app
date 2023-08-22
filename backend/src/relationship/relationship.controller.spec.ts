import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipService } from './relationship.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('RelationshipService', () => {
  let relationshipService: RelationshipService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationshipService, UserService, PrismaService],
    }).compile();

    relationshipService = module.get<RelationshipService>(RelationshipService);
    userService = module.get<UserService>(UserService);
  });

  describe('Is the user following', () => {
    it('should return true if user is following', async () => {
      const followerId = 1; 
      const followingId = 2; 

      // Mock da função getFollowing no UserService para retornar um array de IDs dos usuários seguidos
      userService.getFollowing = jest.fn().mockResolvedValue([{ id: followingId }]);

      const result = await relationshipService.isFollowing(followerId, followingId);

      expect(result).toBe(true);
    });

    it('should return false if user is not following', async () => {
      const followerId = 1; 
      const followingId = 2; 

      // Mock da função getFollowing no UserService para retornar um array vazio
      userService.getFollowing = jest.fn().mockResolvedValue([]);

      const result = await relationshipService.isFollowing(followerId, followingId);

      expect(result).toBe(false);
    });
  });
});
