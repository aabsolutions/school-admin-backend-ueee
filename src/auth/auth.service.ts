import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Role } from '../users/schemas/user.schema';

const ROLE_PRIORITY: Record<Role, number> = {
  [Role.SuperAdmin]: 0,
  [Role.Admin]: 1,
  [Role.Teacher]: 2,
  [Role.Student]: 3,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const valid = await (user as any).validatePassword(password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: user._id.toString(),
      username: user.username,
      role: user.role,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload);

    // Shape matches Angular AuthService expectations exactly
    return {
      user: {
        id: user._id.toString(),
        username: user.username,
        firstName: user.name.split(' ')[0] ?? user.name,
        lastName: user.name.split(' ').slice(1).join(' ') ?? '',
        img: user.avatar,
        roles: [{ name: user.role, priority: ROLE_PRIORITY[user.role] }],
        permissions: user.permissions,
        token: accessToken,
      },
      token: accessToken,
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
