import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: { userId: number }): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '3m' });
  }

  async generateRefreshToken(payload: { userId: number }): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '3d' });
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
