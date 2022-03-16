import { BaseEntityDto } from '@app/common/dto';
import { channel } from '@app/notification/push-notification/pushNotification.const';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BasePushNotificationDto extends BaseEntityDto {
  @AutoMap()
  @ApiProperty({ example: 'Happy Birthday BrioHR' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @AutoMap()
  @ApiProperty({ example: 'DiQi5sBh2jQdrhS2i' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @AutoMap()
  @ApiProperty({ example: 'AiQi5sBh2jQdrhS2m' })
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @AutoMap()
  @ApiProperty({ example: 'ui' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(channel)
  channel: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsOptional()
  isRead: boolean;
}
