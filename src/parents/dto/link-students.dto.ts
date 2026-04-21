import { IsArray, IsMongoId, ArrayMinSize } from 'class-validator';

export class LinkStudentsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  studentIds: string[];
}
