import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, Role } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Roles an ADMIN is allowed to manage
  private readonly ADMIN_MANAGEABLE_ROLES = [Role.Teacher, Role.Student];

  // Roles reservados para creación automática desde estudiantes/docentes
  private readonly RESERVED_ROLES = [Role.Student, Role.Teacher];

  async create(dto: CreateUserDto, callerRole: Role): Promise<UserDocument> {
    if (this.RESERVED_ROLES.includes(dto.role)) {
      throw new BadRequestException(
        'Los roles STUDENT y TEACHER se asignan automáticamente al dar de alta un estudiante o docente. No se pueden crear desde esta UI.',
      );
    }
    this.assertCanManageRole(callerRole, dto.role);
    const existing = await this.userModel.findOne({
      $or: [{ username: dto.username }, { email: dto.email }],
    });
    if (existing) throw new ConflictException('Username or email already in use');

    const user = new this.userModel(dto);
    return user.save();
  }

  async findAll(callerRole: Role): Promise<UserDocument[]> {
    const filter =
      callerRole === Role.SuperAdmin
        ? {}
        : { role: { $in: this.ADMIN_MANAGEABLE_ROLES } };
    return this.userModel.find(filter).select('-password').exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).select('+password').exec();
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    callerRole: Role,
  ): Promise<UserDocument> {
    if (dto.role && this.RESERVED_ROLES.includes(dto.role as Role)) {
      throw new BadRequestException(
        'No se puede asignar el rol STUDENT o TEACHER manualmente.',
      );
    }
    const target = await this.findOne(id);
    this.assertCanManageRole(callerRole, target.role);

    if (dto.password) {
      // Re-save to trigger pre-save hook
      target.set(dto);
      return target.save();
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password');
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async toggleStatus(id: string, callerRole: Role): Promise<UserDocument> {
    const target = await this.findOne(id);
    this.assertCanManageRole(callerRole, target.role);
    target.isActive = !target.isActive;
    return target.save();
  }

  async remove(id: string, callerRole: Role): Promise<void> {
    const target = await this.findOne(id);
    this.assertCanManageRole(callerRole, target.role);
    await this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async setResetToken(userId: string, tokenHash: string, expires: Date): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      resetPasswordToken: tokenHash,
      resetPasswordExpires: expires,
    });
  }

  async findByResetToken(tokenHash: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: new Date() },
      })
      .select('+resetPasswordToken +resetPasswordExpires +password')
      .exec();
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findById(userId).select('+password');
    if (!user) throw new NotFoundException('User not found');
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  }

  async findMe(id: string): Promise<UserDocument> {
    return this.findOne(id);
  }

  async updateMe(id: string, dto: UpdateProfileDto): Promise<UserDocument> {
    // Need +password so the pre-save hook can hash it if changed
    const user = await this.userModel.findById(id).select('+password').exec();
    if (!user) throw new NotFoundException('User not found');
    user.set(dto);
    await user.save();
    // Re-fetch without password for the response
    return this.findOne(id);
  }

  private assertCanManageRole(callerRole: Role, targetRole: Role): void {
    if (callerRole === Role.SuperAdmin) return;
    if (!this.ADMIN_MANAGEABLE_ROLES.includes(targetRole)) {
      throw new ForbiddenException(
        'ADMIN can only manage TEACHER and STUDENT accounts',
      );
    }
  }
}
