import { Model } from 'mongoose';
import { UserDocument, Role } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    private readonly ADMIN_MANAGEABLE_ROLES;
    private readonly RESERVED_ROLES;
    create(dto: CreateUserDto, callerRole: Role): Promise<UserDocument>;
    findAll(callerRole: Role): Promise<UserDocument[]>;
    findAllForMessaging(): Promise<UserDocument[]>;
    findOne(id: string): Promise<UserDocument>;
    findByUsername(username: string): Promise<UserDocument | null>;
    update(id: string, dto: UpdateUserDto, callerRole: Role): Promise<UserDocument>;
    toggleStatus(id: string, callerRole: Role): Promise<UserDocument>;
    remove(id: string, callerRole: Role): Promise<void>;
    resetPasswordToUsername(id: string, callerRole: Role): Promise<void>;
    findByEmail(email: string): Promise<UserDocument | null>;
    setResetToken(userId: string, tokenHash: string, expires: Date): Promise<void>;
    findByResetToken(tokenHash: string): Promise<UserDocument | null>;
    resetPassword(userId: string, newPassword: string): Promise<void>;
    findMe(id: string): Promise<UserDocument>;
    updateMe(id: string, dto: UpdateProfileDto): Promise<UserDocument>;
    private assertCanManageRole;
}
