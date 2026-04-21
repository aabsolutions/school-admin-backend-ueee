import { IsMongoId, IsString, MaxLength } from 'class-validator';

export class CreateCommunicadoDto {
  @IsMongoId()
  studentId: string;

  @IsMongoId()
  parentId: string;

  @IsString()
  @MaxLength(200)
  subject: string;

  @IsString()
  @MaxLength(2000)
  body: string;
}
