import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
}
