import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExpedienteDto {
  @IsNotEmpty() @IsMongoId() studentId: string;
  @IsOptional() @IsString() notas?: string;
}
