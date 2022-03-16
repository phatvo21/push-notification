import { CreateEndpoint } from '@app/common/decorators/create-endpoint.decorator';
import { GetEndpoint } from '@app/common/decorators/get-endpoint.decorator';
import { MapBody } from '@app/common/pipes/map-body.pipe';
import {
  PushNotificationCreateDto,
  PushNotificationCreateEntity,
} from '@app/notification/push-notification/dto/create/pushNotificationCreate.dto';
import { FindPushNotificationQuery } from '@app/notification/push-notification/dto/query/findPushNotification.query';
import { ListQueryDto } from '@app/notification/push-notification/dto/read/listQueryDto/listQuery.dto';
import { ListQueryEntity } from '@app/notification/push-notification/dto/read/listQueryDto/listQuery.entity';
import { SendPushDto, SendPushEntity } from "@app/notification/push-notification/dto/read/sendPush.dto";
import { PushNotificationService } from '@app/notification/push-notification/pushNotification.service';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { omit } from 'lodash';

@Controller('notifications')
@ApiTags('notifications')
export class PushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) {}

  @Post()
  @CreateEndpoint('Create a push notification', PushNotificationCreateDto, SendPushDto, SendPushEntity)
  async create(
    @MapBody(PushNotificationCreateDto, PushNotificationCreateEntity)
    entity: PushNotificationCreateEntity,
  ) {
    return this.pushNotificationService.sendPush(entity);
  }

  @Get()
  @GetEndpoint('Return list notifications for a given channel and a user', ListQueryDto, ListQueryEntity)
  async find(@Query() findPushNotificationsQuery: FindPushNotificationQuery): Promise<ListQueryEntity> {
    const { limit, page, sortBy, sortDirection } = findPushNotificationsQuery;
    const notificationsQuery = omit(findPushNotificationsQuery, ['limit', 'page', 'sortBy', 'sortDirection']);
    return this.pushNotificationService.findPushNotification(limit, page, sortBy, sortDirection, notificationsQuery);
  }
}
