import { Controller, Get, UseGuards, Patch, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
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
}
