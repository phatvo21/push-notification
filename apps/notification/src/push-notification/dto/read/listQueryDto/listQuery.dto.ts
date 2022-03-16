import { PushNotificationReadDto } from '@app/notification/push-notification/dto/read/pushNotificationRead.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ListQueryDto {
  @IsNumber()
  @AutoMap()
  @ApiProperty({ example: 1 })
  total: number;

  @IsNumber()
  @AutoMap()
  @ApiProperty({ example: 1 })
  limit: number;

  @IsNumber()
  @AutoMap()
  @ApiProperty({ example: 1 })
  page: number;

  @AutoMap({ typeFn: () => PushNotificationReadDto })
  @Type(() => PushNotificationReadDto)
  notifications: PushNotificationReadDto[];
}
