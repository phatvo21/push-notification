import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SendPushDto {
  @AutoMap()
  @ApiProperty({ example: true })
  @IsBoolean()
  success: boolean;
}

export class SendPushEntity {
  @AutoMap()
  success: boolean;
}
