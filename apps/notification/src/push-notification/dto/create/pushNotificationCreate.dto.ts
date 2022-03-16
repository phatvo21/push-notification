import { CustomOmitType } from '@app/common/utils/mapper.utils';
import { BasePushNotificationDto } from '@app/notification/push-notification/dto/base/basePushNotification.dto';
import { notificationType } from '@app/notification/push-notification/pushNotification.const';
import { PushNotificationEntity } from '@app/notification/push-notification/schema/pushNotification.schema';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PushNotificationCreateDto extends CustomOmitType(BasePushNotificationDto, [
  'content',
  'channel',
  'isRead',
]) {
  @AutoMap()
  @ApiProperty({ example: 'leave-balance-reminder' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(notificationType)
  type: string;
}

export class PushNotificationCreateEntity extends PushNotificationEntity {
  @AutoMap()
  type: string;
}
