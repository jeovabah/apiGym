/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { phone, password } = request.headers;

    if (!phone || !password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isValidCredentials = await this.validateCredentials(phone, password);

    return isValidCredentials;
  }

  async validateCredentials(phone: string, password: string): Promise<boolean> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          phoneWpp: phone,
          password: password,
        },
      });

      if (users.length === 0) {
        return false;
      }

      const user = users[0];

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      return user ? true : false;
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
