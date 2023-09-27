import { Controller, Get, UseGuards, Patch, Body, Delete, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    @Get('me')
    getMe(@GetUser() user: User){
        return user;
    }

    @Patch()
    editUser(@Body() dto:EditUserDto, @GetUser('id') userId: number){
        return this.userService.editUser(userId, dto)
    }

    @Delete()
    deleteUser(@GetUser('id') userId:number){
        return this.userService.deleteUser(userId)
    }


    @Post(':id/follow')
    followUser(@GetUser('id') userId: number, @Param('id') targetUserId: number){
        return this.userService.addFollower(userId, targetUserId);
    }

    @Post(':id/unfollow')
    unfollowUser(@GetUser('id') userId: number, @Param('id') targetUserId: number){
        return this.userService.removeFollower(userId, targetUserId);
    }

    @Get(':id/followers')
    async getFollowers(@Param('id') userId: number): Promise<User[]> {
        const followers = await this.userService.getFollowers(userId);
        return followers;
    }

    @Get(':id/following')
    async getFollowing(@Param('id') userId: number): Promise<User[]> {
        const following = await this.userService.getFollowing(userId);
        return following;
    }
    
    @Get(':id/is-following')
    async isFollowing(
        @GetUser('id') userId: number,
        @Param('id') targetUserId: number,
    ): Promise<boolean> {
        const isFollowing = await this.userService.isFollowing(userId, targetUserId);
        return isFollowing;
    }
}



