import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty() @IsEnum(['8VO', '9NO', '10MO', '1RO BACH', '2DO BACH', '3RO BACH']) nivel: string;
  @IsOptional() @IsString() especialidad: string;
  @IsNotEmpty() @IsString() paralelo: string;
  @IsNotEmpty() @IsEnum(['Matutina', 'Vespertina', 'Nocturna']) jornada: string;
  @IsNotEmpty() @IsEnum(['EGB Superior', 'Bachillerato General', 'Bachillerato Tecnico']) subnivel: string;
  @IsOptional() @IsEnum(['active', 'inactive']) status?: string;
}
