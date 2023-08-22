import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '.prisma/client'
import { EditUserDto } from './dto';
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
    await this.prisma.user.update({
      where: { id: userId },
      data: { followers: { connect: [{ id: followerId }] } },
    });
  }

  async removeFollower(userId: number, followerId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { followers: { disconnect: [{ id: followerId }] } },
    });
  }

  async getFollowers(userId: number): Promise<User[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { followers: true },
    });

    return user?.followers || [];
  }

  async getFollowing(userId: number): Promise<User[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { following: true },
    });

    return user?.following || [];
  }
  

}