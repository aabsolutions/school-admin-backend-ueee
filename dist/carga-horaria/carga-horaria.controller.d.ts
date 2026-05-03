import { CargaHorariaService } from './carga-horaria.service';
import { SetAsignacionDto } from './dto/set-asignacion.dto';
import { Types } from 'mongoose';
export declare class CargaHorariaController {
    private readonly service;
    constructor(service: CargaHorariaService);
    findByCursoLectivo(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/carga-horaria.schema").CargaHorariaDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/carga-horaria.schema").CargaHoraria & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getDisponibles(id: Types.ObjectId, docenteId: string): Promise<{
        disponibles: any[];
        asignadasAlDocente: string[];
    }>;
    findByDocente(docenteId: Types.ObjectId): Promise<any[]>;
    findMateriasByEstudiante(estudianteId: Types.ObjectId): Promise<{
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
    setAsignacion(id: Types.ObjectId, docenteId: Types.ObjectId, dto: SetAsignacionDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/carga-horaria.schema").CargaHorariaDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/carga-horaria.schema").CargaHoraria & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
