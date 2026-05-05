import { IsString, IsNotEmpty } from 'class-validator';

export class UploadAttachmentDto {
  @IsString() @IsNotEmpty() name: string;
}
