import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService, private jwt:JwtService, private config:ConfigService){}

    async signup(dto: AuthDto){

        const password = await argon.hash(dto.password)
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    password,
                }
            })
            return this.signToken(user.id, user.email);
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
        //Busca o user pelo email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        //Se o user não existe throw exeception
        if(!user) throw new ForbiddenException('Credentials incorrect')
        //compara a senha
        const pwMatches = await argon.verify(user.password, dto.password);
        // Se a senha for incorreta throw exception
        if(!pwMatches) throw new ForbiddenException('Credentials incorrect')

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })

        return {
            access_token: token,
        }
    }
}
