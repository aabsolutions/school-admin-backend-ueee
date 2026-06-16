import { PartialType } from '@nestjs/mapped-types';
import { CreateExpedienteAcademicoDocumentoDto } from './create-expediente-academico-documento.dto';

export class UpdateExpedienteAcademicoDocumentoDto extends PartialType(
  CreateExpedienteAcademicoDocumentoDto,
) {}
