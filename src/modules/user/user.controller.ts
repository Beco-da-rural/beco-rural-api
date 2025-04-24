import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ type: CreateUserResponseDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    return new CreateUserResponseDto(user);
  }
}
