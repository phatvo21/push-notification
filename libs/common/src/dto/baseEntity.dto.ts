import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseEntityDto {
  @AutoMap()
  @ApiProperty({ example: 'Aolg5sBh2jQdrhS2i' })
  @ApiProperty({ readOnly: true })
  @IsOptional()
  _id: string;

  @AutoMap()
  @ApiProperty({ readOnly: true })
  @IsOptional()
  createdAt: Date;

  @AutoMap()
  @ApiProperty({ readOnly: true })
  @IsOptional()
  updatedAt: Date;
}
