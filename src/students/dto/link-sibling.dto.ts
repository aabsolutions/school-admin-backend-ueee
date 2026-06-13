import { IsMongoId } from 'class-validator';

export class LinkSiblingDto {
  @IsMongoId()
  siblingId: string;
}
