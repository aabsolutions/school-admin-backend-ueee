import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CargaHoraria, CargaHorariaDocument } from './schemas/carga-horaria.schema';
import { SetAsignacionDto } from './dto/set-asignacion.dto';

@Injectable()
export class CargaHorariaService {
  constructor(
    @InjectModel(CargaHoraria.name)
    private readonly model: Model<CargaHorariaDocument>,
  ) {}

  /**
   * Todas las asignaciones de un curso lectivo, con docente y materia populados.
   */
  async findByCursoLectivo(cursoLectivoId: string) {
    return this.model
      .find({ cursoLectivoId: new Types.ObjectId(cursoLectivoId) })
      .populate('materiaId', 'nombre codigo')
      .populate('docenteId', 'name email')
      .sort({ createdAt: 1 })
      .exec();
  }

  /**
   * Materias disponibles para asignar a un docente en un curso lectivo.
   * Retorna:
   *   - disponibles: materias del curso NO asignadas a ningún otro docente
   *   - asignadasAlDocente: IDs de materias ya asignadas a ESTE docente
   *
   * El CursoLectivo tiene cursoId → Curso tiene materias[].
   * Requiere que CursoLectivo y Curso estén registrados en mongoose.
   */
  async getDisponibles(cursoLectivoId: string, docenteId: string) {
    // Poblamos el cursoLectivo para obtener el cursoId y sus materias
    const cursoLectivo = await this.model.db
      .model('CursoLectivo')
      .findById(cursoLectivoId)
      .populate({
        path: 'cursoId',
        select: 'nivel especialidad paralelo jornada materias',
        populate: { path: 'materias', select: 'nombre codigo status' },
      })
      .exec() as any;

    if (!cursoLectivo) throw new NotFoundException('Curso lectivo no encontrado');

    const curso = cursoLectivo.cursoId;
    if (!curso) throw new NotFoundException('El curso lectivo no tiene un curso base asociado');

    const todasMaterias: any[] = (curso.materias ?? []).filter((m: any) => m.status === 'active');

    // Asignaciones existentes en este curso lectivo
    const existentes = await this.model
      .find({ cursoLectivoId: new Types.ObjectId(cursoLectivoId) })
      .select('materiaId docenteId')
      .lean()
      .exec();

    // Materias tomadas por OTRO docente
    const docenteOid = new Types.ObjectId(docenteId);
    const tomadasPorOtro = new Set(
      existentes
        .filter(a => !a.docenteId.equals(docenteOid))
        .map(a => a.materiaId.toString()),
    );

    // Materias ya asignadas a ESTE docente
    const asignadasAlDocente = existentes
      .filter(a => a.docenteId.equals(docenteOid))
      .map(a => a.materiaId.toString());

    // Disponibles = no tomadas por otro
    const disponibles = todasMaterias.filter(
      (m: any) => !tomadasPorOtro.has((m._id ?? m.id).toString()),
    );

    return { disponibles, asignadasAlDocente };
  }

  /**
   * Reemplaza la asignación del docente en el curso lectivo.
   * Valida que las materias seleccionadas no estén tomadas por otro docente.
   */
  /**
   * Todas las asignaciones de un docente, agrupadas por cursoLectivo con totalHoras.
   */
  async findByDocente(docenteId: string) {
    const asignaciones = await this.model
      .find({ docenteId: new Types.ObjectId(docenteId) })
      .populate('materiaId', 'nombre codigo horas')
      .populate({
        path: 'cursoLectivoId',
        select: 'academicYear status',
        populate: { path: 'cursoId', select: 'nivel especialidad paralelo jornada subnivel' },
      })
      .sort({ createdAt: 1 })
      .lean()
      .exec();

    // Agrupar por cursoLectivo
    const grupos = new Map<string, any>();
    for (const a of asignaciones) {
      const cl = a.cursoLectivoId as any;
      const clId = cl?._id?.toString() ?? 'sin-curso';
      if (!grupos.has(clId)) {
        grupos.set(clId, { cursoLectivo: cl, materias: [], totalHoras: 0 });
      }
      const grupo = grupos.get(clId);
      const materia = a.materiaId as any;
      grupo.materias.push(materia);
      grupo.totalHoras += materia?.horas ?? 0;
    }

    return Array.from(grupos.values());
  }

  /**
   * Materias del cursoLectivo en el que está matriculado el estudiante,
   * con el docente asignado a cada una (o null si aún no tiene docente).
   * Muestra TODAS las materias del curso base, no solo las que tienen carga horaria.
   */
  async findMateriasByEstudiante(estudianteId: string) {
    // 1. Buscar matrícula activa — soporta studentId guardado como string O como ObjectId
    const enrollment = await this.model.db
      .model('Enrollment')
      .findOne({
        $or: [
          { studentId: estudianteId },
          { studentId: new Types.ObjectId(estudianteId) },
        ],
        status: 'enrolled',
      })
      .select('cursoLectivoId')
      .lean()
      .exec() as any;

    if (!enrollment) return { cursoLectivo: null, materias: [] };

    // cursoLectivoId puede estar guardado como string o como ObjectId
    const cursoLectivoId = enrollment.cursoLectivoId?.toString() as string;

    // 2. Cargar cursoLectivo con su curso base y las materias del curso
    const cursoLectivo = await this.model.db
      .model('CursoLectivo')
      .findById(cursoLectivoId)
      .populate({
        path: 'cursoId',
        select: 'nivel especialidad paralelo jornada subnivel materias',
        populate: { path: 'materias', select: 'nombre codigo horas status' },
      })
      .lean()
      .exec() as any;

    if (!cursoLectivo) return { cursoLectivo: null, materias: [] };

    const curso = cursoLectivo.cursoId as any;
    const todasMaterias: any[] = (curso?.materias ?? []).filter(
      (m: any) => m.status !== 'inactive',
    );

    // 3. Asignaciones de docentes — soporta cursoLectivoId como string O como ObjectId
    const asignaciones = await this.model
      .find({
        $or: [
          { cursoLectivoId: cursoLectivoId },
          { cursoLectivoId: new Types.ObjectId(cursoLectivoId) },
        ],
      })
      .select('materiaId docenteId')
      .populate('docenteId', 'name email')
      .lean()
      .exec();

    // Mapa materiaId → docente
    const docenteMap = new Map<string, any>();
    for (const a of asignaciones) {
      docenteMap.set((a.materiaId as any).toString(), a.docenteId);
    }

    // 4. Cada materia del curso con su docente (o null)
    const materias = todasMaterias.map((m: any) => ({
      materia: m,
      docente: docenteMap.get((m._id ?? m.id).toString()) ?? null,
    }));

    // cursoLectivo para el frontend (sin cursoId expandido, solo datos del periodo)
    const cursoLectivoResponse = {
      _id: cursoLectivo._id,
      academicYear: cursoLectivo.academicYear,
      status: cursoLectivo.status,
      cursoId: curso
        ? {
            nivel: curso.nivel,
            especialidad: curso.especialidad,
            paralelo: curso.paralelo,
            jornada: curso.jornada,
            subnivel: curso.subnivel,
          }
        : null,
    };

    return { cursoLectivo: cursoLectivoResponse, materias };
  }

  async setAsignacion(cursoLectivoId: string, docenteId: string, dto: SetAsignacionDto) {
    const clOid = new Types.ObjectId(cursoLectivoId);
    const dOid  = new Types.ObjectId(docenteId);
    const mOids = dto.materiaIds.map(id => new Types.ObjectId(id));

    // Verificar conflictos: alguna de las materias elegidas está asignada a otro docente
    if (mOids.length > 0) {
      const conflictos = await this.model.find({
        cursoLectivoId: clOid,
        materiaId: { $in: mOids },
        docenteId: { $ne: dOid },
      }).populate('materiaId', 'nombre').lean();

      if (conflictos.length > 0) {
        const nombres = conflictos.map((c: any) => c.materiaId?.nombre ?? c.materiaId).join(', ');
        throw new ConflictException(`Las siguientes materias ya tienen docente asignado: ${nombres}`);
      }
    }

    // Eliminar asignaciones actuales del docente en este curso
    await this.model.deleteMany({ cursoLectivoId: clOid, docenteId: dOid });

    // Insertar las nuevas
    if (mOids.length > 0) {
      const docs = mOids.map(mOid => ({
        cursoLectivoId: clOid,
        materiaId: mOid,
        docenteId: dOid,
      }));
      await this.model.insertMany(docs);
    }

    return this.findByCursoLectivo(cursoLectivoId);
  }
}
