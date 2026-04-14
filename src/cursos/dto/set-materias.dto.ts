import { IsArray, IsMongoId } from 'class-validator';

export class SetMateriasDto {
  @IsArray()
  @IsMongoId({ each: true })
  materias: string[];
}
