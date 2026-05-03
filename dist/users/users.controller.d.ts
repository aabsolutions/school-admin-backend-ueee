import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Types } from 'mongoose';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(req: any): Promise<import("./schemas/user.schema").UserDocument[]>;
    findMe(req: any): Promise<import("./schemas/user.schema").UserDocument>;
    updateMe(req: any, dto: UpdateProfileDto): Promise<import("./schemas/user.schema").UserDocument>;
    findOne(id: Types.ObjectId): Promise<import("./schemas/user.schema").UserDocument>;
    create(dto: CreateUserDto, req: any): Promise<import("./schemas/user.schema").UserDocument>;
    update(id: Types.ObjectId, dto: UpdateUserDto, req: any): Promise<import("./schemas/user.schema").UserDocument>;
    toggleStatus(id: Types.ObjectId, req: any): Promise<import("./schemas/user.schema").UserDocument>;
    resetPassword(id: Types.ObjectId, req: any): Promise<void>;
    remove(id: Types.ObjectId, req: any): Promise<void>;
}
