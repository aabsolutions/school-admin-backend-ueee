import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoLectivoDto } from './create-curso-lectivo.dto';

export class UpdateCursoLectivoDto extends PartialType(CreateCursoLectivoDto) {}
