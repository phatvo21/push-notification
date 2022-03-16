import { BaseQuery } from '@app/common/base-query/baseQuery.query';
import { CustomOmitType } from '@app/common/utils/mapper.utils';
import { channel } from '@app/notification/push-notification/pushNotification.const';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class FindPushNotificationQuery extends BaseQuery {
  @IsString()
  @ApiProperty({ example: 10 })
  limit: number;

  @IsString()
  @ApiProperty({ example: 1 })
  page: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'DiQi5sBh2jQdrhS2i' })
  @ApiPropertyOptional()
  userId: string;

  @IsString()
  @ApiProperty({ example: 'ui' })
  @IsNotEmpty()
  @IsEnum(channel)
  channel: string;
}

export class PushNotificationQuery extends CustomOmitType(FindPushNotificationQuery, [
  'limit',
  'page',
  'sortBy',
  'sortDirection',
]) {}
