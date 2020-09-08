import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArchiveDto {
  @ApiProperty()
  @IsNumber()
  typePublicationId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  detail: string;
}
