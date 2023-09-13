import { Injectable } from '@nestjs/common';
import { User } from '.prisma/client'
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //User (Edição e Deleção)
  async editUser(userId: number, dto: EditUserDto){
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;
    return user;
  }

  async deleteUser(userId: number): Promise<User>{
    return this.prisma.user.delete({
      where: {
        id: userId,
      }
    })
  }
  //User (Seguidos/Amigos)
      async addFollower(userId: number, followerId: number): Promise<void> {
        try {
          const users = await this.prisma.user.findMany({
            where: {
              OR: [
                { id: userId },
                { id: followerId },
              ],
            },
          });

          const userExists = users.find(user => user.id === userId);
          const followerExists = users.find(user => user.id === followerId);

          if (userExists && followerExists) {
            const followerCount = await this.prisma.user.count({
              where: {
                id: userId,
                followers: {
                  some: {
                    id: followerId,
                  },
                },
              },
            });

            if (followerCount === 0) {
              await this.prisma.$transaction([
                this.prisma.user.update({
                  where: { id: userId },
                  data: { followers: { connect: [{ id: followerId }] } },
                }),
                this.prisma.user.update({
                  where: { id: followerId },
                  data: { following: { connect: [{ id: userId }] } },
                }),
              ]);
            }
          } else {
            throw new Error('User or follower does not exist');
          }
        } catch (error) {
          console.error('An error occurred during the addFollower operation:', error);
          throw new Error('Failed to add follower');
        }
      }

  async removeFollower(userId: number, followerId: number): Promise<void> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          OR: [
            { id: userId },
            { id: followerId },
          ],
        },
      });

      const userExists = users.find(user => user.id === userId);
      const followerExists = users.find(user => user.id === followerId);

      if (userExists && followerExists) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            followers: { disconnect: [{ id: followerId }] },
            following: { disconnect: [{ id: followerId }] },
          },
        });
        console.log('Follower removed successfully');
      } else {
        throw new Error('User or follower does not exist');
      }
    } catch (error) {
      console.error('An error occurred during the removeFollower operation:', error);
      throw new Error('Failed to remove follower');
    }
  }

  async getFollowers(userId: number): Promise<User[]> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { followers: true },
      });

      if (!user) {
        throw new Error('User does not exist');
      }

      return user.followers;
    } catch (error) {
      console.error('An error occurred during the getFollowers operation:', error);
      throw new Error('Failed to get followers');
    }
  }

  async getFollowing(userId: number): Promise<User[]> {
    console.log(`Getting following for user with id: ${userId}`);
  
    if (isNaN(userId)) {
      throw new Error('Invalid userId');
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { following: true },
      });

      if (!user) {
        throw new Error('User does not exist');
      }

      return user.following
    } catch (error) {
      console.error('An error occurred during the getFollowing operation:', error);
      throw new Error('Failed to get following');
    }
  }
  

  async isFollowing(userId: number, followerId: number): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { following: { where: { id: followerId } } },
      });
  
      if (!user) {
        throw new Error('User does not exist');
      }
  
      return user.following.length > 0;
    } catch (error) {
      console.error('An error occurred during the isFollowing operation:', error);
      throw new Error('Failed to check if user is following');
    }
  }

  async getFollowersCount(userId: number): Promise<number> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { followers: true },
      });
  
      if (!user) {
        throw new Error('User does not exist');
      }
  
      const followerCount = user.followers.length;
      return followerCount;
    } catch (error) {
      console.error('An error occurred during the getFollowersCount operation:', error);
      throw new Error('Failed to get followers count');
    }
  }

}