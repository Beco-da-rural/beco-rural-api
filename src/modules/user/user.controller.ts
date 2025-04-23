import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(createUserDto);
  }
}
