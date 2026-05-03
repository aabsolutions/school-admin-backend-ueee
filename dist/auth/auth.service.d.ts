import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { RoleConfigService } from '../role-config/role-config.service';
import { JwtUser } from './interfaces/jwt-user.interface';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly config;
    private readonly mailService;
    private readonly roleConfigService;
    constructor(usersService: UsersService, jwtService: JwtService, config: ConfigService, mailService: MailService, roleConfigService: RoleConfigService);
    login(username: string, password: string): Promise<{
        user: {
            id: string;
            username: string;
            firstName: string;
            lastName: string;
            img: string;
            roles: {
                name: string;
                priority: number;
            }[];
            permissions: string[];
            sidebarPermissions: string[];
            token: string;
        };
        token: string;
    }>;
    validateToken(token: string): Promise<any>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(rawToken: string, newPassword: string): Promise<void>;
    getMe(user: JwtUser): Promise<JwtUser & {
        sidebarPermissions: string[];
    }>;
}
