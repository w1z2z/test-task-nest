import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import {
  AuthResponseDto,
  RegistrationRequestDto,
  RegistrationResponseDto,
} from '../dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @ApiOkResponse({
    type: RegistrationResponseDto,
    description: 'Регистрация нового пользователя',
  })
  @ApiBody({ type: RegistrationRequestDto })
  @Post('registration')
  async registration(
    @Body() data: RegistrationRequestDto,
  ): Promise<RegistrationResponseDto> {
    return await this.authService.registration(data);
  }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'Авторизация пользователя',
  })
  @ApiBody({ type: RegistrationRequestDto })
  @Post('login')
  async authorization(@Body() data: RegistrationRequestDto): Promise<AuthResponseDto> {
    return await this.authService.authorization(data);
  }
}
