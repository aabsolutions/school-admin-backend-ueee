import { Model, Types } from 'mongoose';
import { CargaHoraria, CargaHorariaDocument } from './schemas/carga-horaria.schema';
import { SetAsignacionDto } from './dto/set-asignacion.dto';
export declare class CargaHorariaService {
    private readonly model;
    constructor(model: Model<CargaHorariaDocument>);
    findByCursoLectivo(cursoLectivoId: string): Promise<(import("mongoose").Document<unknown, {}, CargaHorariaDocument, {}, import("mongoose").DefaultSchemaOptions> & CargaHoraria & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getDisponibles(cursoLectivoId: string, docenteId: string): Promise<{
        disponibles: any[];
        asignadasAlDocente: string[];
    }>;
    findByDocente(docenteId: string): Promise<any[]>;
    findMateriasByEstudiante(estudianteId: string): Promise<{
        cursoLectivo: {
            _id: any;
            academicYear: any;
            status: any;
            cursoId: {
                nivel: any;
                especialidad: any;
                paralelo: any;
                jornada: any;
                subnivel: any;
            };
        };
        materias: {
            materia: any;
            docente: any;
        }[];
    }>;
    setAsignacion(cursoLectivoId: string, docenteId: string, dto: SetAsignacionDto): Promise<(import("mongoose").Document<unknown, {}, CargaHorariaDocument, {}, import("mongoose").DefaultSchemaOptions> & CargaHoraria & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
