import { IsArray, IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class BroadcastNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(['ADMIN', 'SUPERADMIN', 'TEACHER', 'STUDENT'], { each: true })
  roles?: string[];
}
