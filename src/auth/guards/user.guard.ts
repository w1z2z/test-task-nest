import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));

      if (decodedToken && decodedToken.userId) {
        request.user = { id: decodedToken.userId };
        return true;
      }
    } catch (e) {
      return false;
    }

    return false;
  }
}
