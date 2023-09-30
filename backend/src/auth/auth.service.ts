import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService){}

    async signup(dto: AuthDto){
        const password = await bcrypt.hash(dto.password, 10);
    
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    password,
                },
            })
            return user;
        } catch(error){
            if (error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials Taken')
                }
            }
            throw error;
        }
    }
    async signin(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!user){
            throw new NotFoundException('User not found!')
        }

        const isPassword = await bcrypt.compare(dto.password, user.password);
        
        if(!isPassword){
            throw new ForbiddenException('Invalid Credentials')
        }

        return user;
    }

    

}
