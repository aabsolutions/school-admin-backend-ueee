import { PartialType } from '@nestjs/mapped-types';
import { CreateDeceRegistroDto } from './create-dece-registro.dto';

export class UpdateDeceRegistroDto extends PartialType(CreateDeceRegistroDto) {}
