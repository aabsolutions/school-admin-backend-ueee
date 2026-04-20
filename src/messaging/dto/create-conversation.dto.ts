import { IsEnum, IsArray, ArrayMinSize, IsMongoId, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateConversationDto {
  @IsEnum(['direct', 'group'])
  type: 'direct' | 'group';

  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  participantIds: string[];

  @ValidateIf((o) => o.type === 'group')
  @IsString()
  @IsOptional()
  name?: string;
}
