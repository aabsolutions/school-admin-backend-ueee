export declare class CreateUserDto {
    username: string;
    password: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    isActive?: boolean;
    permissions?: string[];
}
