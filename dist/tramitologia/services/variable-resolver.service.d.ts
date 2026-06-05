import { Model, Types } from 'mongoose';
import { StudentDocument } from '../../students/schemas/student.schema';
import { ParentDocument } from '../../parents/schemas/parent.schema';
import { EnrollmentDocument } from '../../enrollments/schemas/enrollment.schema';
import { CursoLectivoDocument } from '../../curso-lectivo/schemas/curso-lectivo.schema';
import { CursoDocument } from '../../cursos/schemas/curso.schema';
import { TeacherDocument } from '../../teachers/schemas/teacher.schema';
import { InstitucionDocument } from '../../institucion/schemas/institucion.schema';
export interface ResolverCtx {
    estudianteId?: string | Types.ObjectId;
    datosRepresentante?: {
        nombre: string;
        dni: string;
        contacto: string;
    };
    codigo: string;
    cursoNombre?: string;
}
export interface ResolverActor {
    name: string;
}
export declare class VariableResolverService {
    private readonly studentModel;
    private readonly parentModel;
    private readonly enrollmentModel;
    private readonly cursoLectivoModel;
    private readonly cursoModel;
    private readonly teacherModel;
    private readonly institucionModel;
    constructor(studentModel: Model<StudentDocument>, parentModel: Model<ParentDocument>, enrollmentModel: Model<EnrollmentDocument>, cursoLectivoModel: Model<CursoLectivoDocument>, cursoModel: Model<CursoDocument>, teacherModel: Model<TeacherDocument>, institucionModel: Model<InstitucionDocument>);
    resolve(ctx: ResolverCtx, actor: ResolverActor, observation?: string): Promise<Record<string, string>>;
}
