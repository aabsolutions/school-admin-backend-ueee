import { IsArray, IsMongoId } from 'class-validator';

export class SetAsignacionDto {
  @IsArray()
  @IsMongoId({ each: true })
  materiaIds: string[];
}
