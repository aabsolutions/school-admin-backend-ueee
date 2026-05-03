import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
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
    me(req: any): Promise<import("./interfaces/jwt-user.interface").JwtUser & {
        sidebarPermissions: string[];
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
