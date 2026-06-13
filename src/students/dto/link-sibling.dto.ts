import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LinkSiblingDto {
  @IsNotEmpty() @IsMongoId()
  siblingId: string;
}
