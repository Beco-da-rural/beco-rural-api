import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ZodPipe } from '@app/common/pipe/zod.pipe';
import { UserService } from './user.service';
import { CreateUserDto, createUserSchema } from './dtos/create-user.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ type: CreateUserResponseDto })
  @Post('register')
  async register(@Body(new ZodPipe(createUserSchema)) createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userService.createUser(createUserDto.toUser());
    return new CreateUserResponseDto(user);
  }
}
