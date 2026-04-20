import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
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
    private readonly mailService: MailService,
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

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    // Siempre respondemos 200 — nunca revelamos si el email existe
    if (!user || !user.isActive) return;

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    await this.usersService.setResetToken((user._id as unknown as string), tokenHash, expires);

    const frontendUrl = this.config.get<string>(
      'FRONTEND_URL',
      'https://aabsolutions.github.io/school-admin-frontend-ueee',
    );
    const resetUrl = `${frontendUrl}/#/authentication/reset-password?token=${rawToken}`;

    await this.mailService.sendPasswordReset(user.email, user.name, resetUrl);
  }

  async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const user = await this.usersService.findByResetToken(tokenHash);

    if (!user) {
      throw new BadRequestException('El enlace es inválido o ya expiró');
    }

    await this.usersService.resetPassword((user._id as unknown as string), newPassword);
  }
}
