import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ type: CreateUserResponseDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userService.createUser(createUserDto.toUser());
    return new CreateUserResponseDto(user);
  }
}
