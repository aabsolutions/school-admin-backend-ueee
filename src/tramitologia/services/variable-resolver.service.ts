import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Student, StudentDocument } from '../../students/schemas/student.schema';
import { Parent, ParentDocument } from '../../parents/schemas/parent.schema';
import { Enrollment, EnrollmentDocument } from '../../enrollments/schemas/enrollment.schema';
import { CursoLectivo, CursoLectivoDocument } from '../../curso-lectivo/schemas/curso-lectivo.schema';
import { Curso, CursoDocument } from '../../cursos/schemas/curso.schema';
import { Teacher, TeacherDocument } from '../../teachers/schemas/teacher.schema';
import { Institucion, InstitucionDocument } from '../../institucion/schemas/institucion.schema';

export interface ResolverCtx {
  estudianteId?: string | Types.ObjectId;
  datosRepresentante?: { nombre: string; dni: string; contacto: string };
  codigo: string;
  cursoNombre?: string;
}

export interface ResolverActor {
  name: string;
}

const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

@Injectable()
export class VariableResolverService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>,
    @InjectModel(Parent.name) private readonly parentModel: Model<ParentDocument>,
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(CursoLectivo.name) private readonly cursoLectivoModel: Model<CursoLectivoDocument>,
    @InjectModel(Curso.name) private readonly cursoModel: Model<CursoDocument>,
    @InjectModel(Teacher.name) private readonly teacherModel: Model<TeacherDocument>,
    @InjectModel(Institucion.name) private readonly institucionModel: Model<InstitucionDocument>,
  ) {}

  async resolve(ctx: ResolverCtx, actor: ResolverActor, observation?: string): Promise<Record<string, string>> {
    const now = new Date();
    const fmt = (d: Date) => new Intl.DateTimeFormat('es-EC').format(d);

    const vars: Record<string, string> = {};

    // DATE_VARS
    vars['FECHA_ACTUAL'] = fmt(now);
    vars['FECHA_DIA'] = String(now.getDate());
    vars['FECHA_MES'] = String(now.getMonth() + 1).padStart(2, '0');
    vars['FECHA_MES_NOMBRE'] = MONTH_NAMES[now.getMonth()];
    vars['FECHA_ANIO'] = String(now.getFullYear());
    vars['FECHA_LARGA'] = `${now.getDate()} de ${MONTH_NAMES[now.getMonth()]} de ${now.getFullYear()}`;
    vars['FECHA_HORA'] = now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });

    // TRAMITE_VARS
    vars['USUARIO_LOGUEADO'] = actor.name;
    vars['ID_TRAMITE'] = ctx.codigo;
    vars['CODIGO_TRAMITE'] = ctx.codigo;
    vars['OBSERVACION_TRAMITE'] = observation ?? '';
    vars['NOMBRE_SOLICITANTE'] = ctx.datosRepresentante?.nombre ?? '';

    // REPRESENTANTE base — datosRepresentante como fallback; se sobreescribe si hay Parent en DB
    vars['REPRESENTANTE_NOMBRE'] = ctx.datosRepresentante?.nombre ?? '';
    vars['REPRESENTANTE_DNI'] = ctx.datosRepresentante?.dni ?? '';
    vars['REPRESENTANTE_MOBILE'] = ctx.datosRepresentante?.contacto ?? '';
    vars['REPRESENTANTE_EMAIL'] = '';
    vars['REPRESENTANTE_GENERO'] = '';
    vars['REPRESENTANTE_OCUPACION'] = '';
    vars['REPRESENTANTE_NIVEL_EDUCATIVO'] = '';
    vars['REPRESENTANTE_DIRECCION'] = '';

    // Student
    let student: any = null;
    if (ctx.estudianteId) {
      student = await this.studentModel.findById(ctx.estudianteId).lean().exec();
    }

    if (student) {
      vars['NOMBRE_ESTUDIANTE'] = student.name ?? '';
      vars['ESTUDIANTE_DNI'] = student.dni ?? '';
      vars['ESTUDIANTE_EMAIL'] = student.email ?? '';
      vars['ESTUDIANTE_MOBILE'] = student.mobile ?? '';
      vars['ESTUDIANTE_GENERO'] = student.gender ?? '';
      vars['ESTUDIANTE_FECHA_NACIMIENTO'] = student.birthdate ? fmt(new Date(student.birthdate)) : '';
      vars['ESTUDIANTE_EDAD'] = student.birthdate
        ? String(Math.floor((now.getTime() - new Date(student.birthdate).getTime()) / (365.25 * 24 * 3600 * 1000)))
        : '';
      vars['ESTUDIANTE_DIRECCION'] = student.address ?? '';
      vars['ESTUDIANTE_ZONA_RESIDENCIA'] = student.residenceZone ?? '';
      vars['ESTUDIANTE_REPRESENTANTE'] = student.parentGuardianName ?? '';
      vars['ESTUDIANTE_REPRESENTANTE_MOBILE'] = student.parentGuardianMobile ?? '';
      vars['ESTUDIANTE_PADRE_NOMBRE'] = student.fatherName ?? '';
      vars['ESTUDIANTE_PADRE_MOBILE'] = student.fatherMobile ?? '';
      vars['ESTUDIANTE_MADRE_NOMBRE'] = student.motherName ?? '';
      vars['ESTUDIANTE_MADRE_MOBILE'] = student.motherMobile ?? '';
      vars['ESTUDIANTE_SITUACION_FAMILIAR'] = student.familyInfo?.familySituation ?? '';
      vars['ESTUDIANTE_VIVE_CON'] = student.familyInfo?.livesWithWhom ?? '';

      // Parent/Guardian — override base REPRESENTANTE vars si hay datos más completos en DB
      // Busca primero por link directo en el estudiante; si no, busca el padre que tiene este estudiante en studentIds
      const parentId = student.guardianId ?? student.fatherId ?? student.motherId ?? (student.parentIds?.[0] ?? null);
      const parent = parentId
        ? await this.parentModel.findById(parentId).lean().exec()
        : await this.parentModel.findOne({ studentIds: student._id }).lean().exec();
      if (parent) {
        if (parent.name) vars['REPRESENTANTE_NOMBRE'] = parent.name;
        if (parent.dni) vars['REPRESENTANTE_DNI'] = parent.dni;
        if (parent.email) vars['REPRESENTANTE_EMAIL'] = parent.email;
        if (parent.mobile) vars['REPRESENTANTE_MOBILE'] = parent.mobile;
        if (parent.gender) vars['REPRESENTANTE_GENERO'] = parent.gender;
        if ((parent as any).occupation) vars['REPRESENTANTE_OCUPACION'] = (parent as any).occupation;
        if ((parent as any).educationLevel) vars['REPRESENTANTE_NIVEL_EDUCATIVO'] = (parent as any).educationLevel;
        if ((parent as any).address) vars['REPRESENTANTE_DIRECCION'] = (parent as any).address;
      }

      // Enrollment → CursoLectivo → Curso → Teachers
      const enrollment = await this.enrollmentModel
        .findOne({ studentId: student._id, status: 'enrolled' })
        .sort({ enrolledAt: -1 })
        .lean()
        .exec();

      if (enrollment) {
        const cursoLectivo = await this.cursoLectivoModel.findById(enrollment.cursoLectivoId).lean().exec();
        if (cursoLectivo) {
          vars['ANIO_LECTIVO'] = cursoLectivo.academicYear ?? '';
          vars['CURSO_ESTADO'] = cursoLectivo.status ?? '';

          const curso = await this.cursoModel.findById(cursoLectivo.cursoId).lean().exec();
          if (curso) {
            vars['CURSO_NOMBRE'] = [curso.nivel, curso.paralelo, curso.jornada].filter(Boolean).join(' ');
            vars['CURSO_NIVEL'] = curso.nivel ?? '';
            vars['CURSO_PARALELO'] = curso.paralelo ?? '';
            vars['CURSO_JORNADA'] = curso.jornada ?? '';
            vars['CURSO_ESPECIALIDAD'] = curso.especialidad ?? '';
            vars['CURSO_SUBNIVEL'] = curso.subnivel ?? '';
          }

          if (cursoLectivo.tutorId) {
            const t = await this.teacherModel.findById(cursoLectivo.tutorId).select('name').lean().exec();
            vars['CURSO_TUTOR'] = (t as any)?.name ?? '';
          }
          if (cursoLectivo.inspectorId) {
            const t = await this.teacherModel.findById(cursoLectivo.inspectorId).select('name').lean().exec();
            vars['CURSO_INSPECTOR'] = (t as any)?.name ?? '';
          }
          if (cursoLectivo.psicologoId) {
            const t = await this.teacherModel.findById(cursoLectivo.psicologoId).select('name').lean().exec();
            vars['CURSO_PSICOLOGO'] = (t as any)?.name ?? '';
          }
        }
      } else if (ctx.cursoNombre) {
        vars['CURSO_NOMBRE'] = ctx.cursoNombre;
      }
    } else {
      vars['NOMBRE_ESTUDIANTE'] = '';
      vars['CURSO_NOMBRE'] = ctx.cursoNombre ?? '';
    }

    // Fill any remaining vars with '' defaults (REPRESENTANTE_* ya se setean arriba)
    const DEFAULTS = [
      'ESTUDIANTE_DNI', 'ESTUDIANTE_EMAIL', 'ESTUDIANTE_MOBILE', 'ESTUDIANTE_GENERO',
      'ESTUDIANTE_FECHA_NACIMIENTO', 'ESTUDIANTE_EDAD', 'ESTUDIANTE_DIRECCION', 'ESTUDIANTE_ZONA_RESIDENCIA',
      'ESTUDIANTE_REPRESENTANTE', 'ESTUDIANTE_REPRESENTANTE_MOBILE', 'ESTUDIANTE_PADRE_NOMBRE',
      'ESTUDIANTE_PADRE_MOBILE', 'ESTUDIANTE_MADRE_NOMBRE', 'ESTUDIANTE_MADRE_MOBILE',
      'ESTUDIANTE_SITUACION_FAMILIAR', 'ESTUDIANTE_VIVE_CON',
      'CURSO_NIVEL', 'CURSO_PARALELO', 'CURSO_JORNADA', 'CURSO_ESPECIALIDAD', 'CURSO_SUBNIVEL',
      'ANIO_LECTIVO', 'CURSO_ESTADO', 'CURSO_TUTOR', 'CURSO_INSPECTOR', 'CURSO_PSICOLOGO',
    ];
    for (const k of DEFAULTS) {
      if (vars[k] === undefined) vars[k] = '';
    }

    // Institution
    const institucion = await this.institucionModel.findOne().populate('autoridad', 'name email').lean().exec();
    if (institucion) {
      vars['INSTITUCION_NOMBRE'] = (institucion as any).nombre ?? '';
      vars['INSTITUCION_AMIE'] = (institucion as any).codigoAMIE ?? '';
      vars['INSTITUCION_DISTRITO'] = (institucion as any).distrito ?? '';
      vars['INSTITUCION_PROVINCIA'] = (institucion as any).provincia ?? '';
      vars['INSTITUCION_CANTON'] = (institucion as any).canton ?? '';
      vars['INSTITUCION_DIRECCION'] = (institucion as any).direccion ?? '';
      vars['INSTITUCION_EMAIL'] = (institucion as any).email ?? '';
      vars['INSTITUCION_CONTACTO'] = (institucion as any).contacto ?? '';
      const auth = (institucion as any).autoridad;
      vars['INSTITUCION_AUTORIDAD'] = auth?.name ?? '';
      vars['INSTITUCION_AUTORIDAD_EMAIL'] = auth?.email ?? '';
      vars['INSTITUCION_PERIODO_LECTIVO'] = (institucion as any).periodoLectivoFuncional ?? '';
    } else {
      for (const k of ['INSTITUCION_NOMBRE', 'INSTITUCION_AMIE', 'INSTITUCION_DISTRITO', 'INSTITUCION_PROVINCIA',
        'INSTITUCION_CANTON', 'INSTITUCION_DIRECCION', 'INSTITUCION_EMAIL', 'INSTITUCION_CONTACTO',
        'INSTITUCION_AUTORIDAD', 'INSTITUCION_AUTORIDAD_EMAIL', 'INSTITUCION_PERIODO_LECTIVO']) {
        vars[k] = '';
      }
    }

    return vars;
  }
}
