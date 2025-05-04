import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ default: 'token' })
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}
