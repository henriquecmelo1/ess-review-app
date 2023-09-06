import { Controller, Get, UseGuards, Patch, Body, Delete, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
@UseGuards(JwtGuard)
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

    @Delete(':id')
    deleteUserById(@GetUser('id') userId: number){
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
}
