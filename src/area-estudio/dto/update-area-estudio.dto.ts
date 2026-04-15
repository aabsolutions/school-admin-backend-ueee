import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaEstudioDto } from './create-area-estudio.dto';

export class UpdateAreaEstudioDto extends PartialType(CreateAreaEstudioDto) {}
