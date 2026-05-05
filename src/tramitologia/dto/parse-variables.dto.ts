import { IsString, IsNotEmpty } from 'class-validator';

export class ParseVariablesDto {
  @IsString() @IsNotEmpty() bodyHtml: string;
}
