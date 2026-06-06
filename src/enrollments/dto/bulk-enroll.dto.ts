import { IsArray, IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';

export class BulkEnrollDto {
  @IsNotEmpty() @IsString() cursoLectivoId: string;
  @IsArray() @ArrayMinSize(1) studentIds: string[];
}
