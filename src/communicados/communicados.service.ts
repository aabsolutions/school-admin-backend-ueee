import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Communicado, CommunicadoDocument } from './schemas/communicado.schema';
import { Parent, ParentDocument } from '../parents/schemas/parent.schema';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateCommunicadoDto } from './dto/create-communicado.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CommunicadosService {
  constructor(
    @InjectModel(Communicado.name)
    private readonly communicadoModel: Model<CommunicadoDocument>,
    @InjectModel(Parent.name)
    private readonly parentModel: Model<ParentDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(teacherUserId: string, dto: CreateCommunicadoDto): Promise<CommunicadoDocument> {
    const [teacher, student, parent] = await Promise.all([
      this.userModel.findById(teacherUserId).select('name').lean(),
      this.studentModel.findById(dto.studentId).select('name').lean(),
      this.parentModel.findById(dto.parentId).select('name userId').lean(),
    ]);

    if (!teacher) throw new NotFoundException('Docente no encontrado');
    if (!student) throw new NotFoundException('Estudiante no encontrado');
    if (!parent) throw new NotFoundException('Padre no encontrado');

    const communicado = await new this.communicadoModel({
      teacherUserId: new Types.ObjectId(teacherUserId),
      teacherName: teacher.name,
      studentId: new Types.ObjectId(dto.studentId),
      studentName: student.name,
      parentId: new Types.ObjectId(dto.parentId),
      parentUserId: parent.userId,
      subject: dto.subject,
      body: dto.body,
    }).save();

    await this.notificationsService.create(
      parent.userId.toString(),
      'communicado',
      `Nuevo comunicado: ${dto.subject}`,
      `${teacher.name} le envió un comunicado sobre ${student.name}`,
    );

    return communicado;
  }

  async findByTeacher(teacherUserId: string, query: PaginationQueryDto) {
    const { page = 1, limit = 10, search } = query;
    const filter: any = { teacherUserId: new Types.ObjectId(teacherUserId) };

    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.communicadoModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.communicadoModel.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findByParent(parentUserId: string, query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const filter = { parentUserId: new Types.ObjectId(parentUserId) };

    const [data, total] = await Promise.all([
      this.communicadoModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.communicadoModel.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, requestingUserId: string): Promise<CommunicadoDocument> {
    const communicado = await this.communicadoModel.findById(id);
    if (!communicado) throw new NotFoundException('Comunicado no encontrado');

    const isTeacher = communicado.teacherUserId.toString() === requestingUserId;
    const isParent = communicado.parentUserId.toString() === requestingUserId;

    if (!isTeacher && !isParent) {
      throw new ForbiddenException('No tenés acceso a este comunicado');
    }

    return communicado;
  }

  async markReceived(id: string, parentUserId: string): Promise<CommunicadoDocument> {
    const communicado = await this.communicadoModel.findById(id);
    if (!communicado) throw new NotFoundException('Comunicado no encontrado');

    if (communicado.parentUserId.toString() !== parentUserId) {
      throw new ForbiddenException('No podés marcar este comunicado como recibido');
    }

    if (communicado.status === 'received') return communicado;

    communicado.status = 'received';
    communicado.receivedAt = new Date();
    await communicado.save();

    await this.notificationsService.create(
      communicado.teacherUserId.toString(),
      'communicado',
      'Comunicado recibido',
      `${communicado.studentName}: "${communicado.subject}" fue confirmado como recibido`,
    );

    return communicado;
  }
}
