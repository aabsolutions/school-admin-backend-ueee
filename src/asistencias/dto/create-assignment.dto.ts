import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  cursoLectivoId: string;
}
