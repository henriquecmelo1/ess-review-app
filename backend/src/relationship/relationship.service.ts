import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelationshipService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {}
  

  async followUser(followerId: number, followingId: number): Promise<void> {
    const isFollowing = await this.prisma.user.findUnique({
      where: { id: followerId },
      select: { following: { where: { id: followingId } } },
    });

    if (!isFollowing) {
      await this.userService.addFollower(followingId, followerId);
    }
    else{
      await this.userService.removeFollower(followingId, followerId);
    }

  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const followingUsers = await this.userService.getFollowing(followerId);
    return followingUsers.some(user => user.id === followingId);
  }
}
