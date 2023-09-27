import { Body, Controller, Post, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
        @Post('signup')
        signup(@Body() dto:AuthDto){
            console.log({dto})
            return this.authService.signup(dto);
        }

        @Post('signin')
        async signin(@Body() dto: AuthDto){
            const user = await this.authService.signin(dto);
            return { message: 'User signed in', user};
        }
}
