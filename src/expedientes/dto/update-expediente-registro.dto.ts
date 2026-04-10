import { PartialType } from '@nestjs/mapped-types';
import { CreateExpedienteRegistroDto } from './create-expediente-registro.dto';

export class UpdateExpedienteRegistroDto extends PartialType(CreateExpedienteRegistroDto) {}
