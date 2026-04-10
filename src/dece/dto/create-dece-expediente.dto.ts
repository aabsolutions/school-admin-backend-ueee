import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeceExpedienteDto {
  @IsNotEmpty() @IsMongoId() studentId: string;
  @IsOptional() @IsString() notas?: string;
}
