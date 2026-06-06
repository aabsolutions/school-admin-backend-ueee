import { IsArray, IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';

export class BulkPreviewDto {
  @IsNotEmpty() @IsString() cursoLectivoId: string;
  @IsArray() @ArrayMinSize(1) dnis: string[];
}
