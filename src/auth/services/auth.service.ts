import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { AuthResponseDto, RegistrationRequestDto, RegistrationResponseDto } from "../dtos";
import { TokenService } from '../../token/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: TokenService,
  ) {}

  async registration(
    data: RegistrationRequestDto,
  ): Promise<RegistrationResponseDto> {
    const { email, password } = data;

    const userExists: User = await this.userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException(
        'Пользователь с данной почтой уже зарегистрирован',
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: User = this.userRepository.create({
        email,
        password: hashedPassword,
      });

      await this.userRepository.save(newUser);

      return { message: 'Регистрация прошла успешно' };
    }
  }

  async authorization(data: RegistrationRequestDto): Promise<AuthResponseDto> {
    const { email, password } = data;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Пользователь с такой почтой не найден!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Неверный пароль!');
    }

    const accessToken =
      'Bearer ' +
      (await this.jwtService.generateAccessToken({
        userId: user.id,
      }));
    const refreshToken =
      'Bearer ' +
      (await this.jwtService.generateRefreshToken({
        userId: user.id,
      }));

    return { accessToken, refreshToken };
  }
}
