import { BaseEntityDto } from '@app/common/dto';
import { BaseEntity } from '@app/common/schemas/base.schema';
import { BasePushNotificationDto } from '@app/notification/push-notification/dto/base/basePushNotification.dto';
import {
  PushNotificationCreateDto,
  PushNotificationCreateEntity,
} from '@app/notification/push-notification/dto/create/pushNotificationCreate.dto';
import { ListQueryDto } from '@app/notification/push-notification/dto/read/listQueryDto/listQuery.dto';
import { ListQueryEntity } from '@app/notification/push-notification/dto/read/listQueryDto/listQuery.entity';
import { PushNotificationReadDto } from '@app/notification/push-notification/dto/read/pushNotificationRead.dto';
import { SendPushDto, SendPushEntity } from '@app/notification/push-notification/dto/read/sendPush.dto';
import { PushNotificationEntity } from '@app/notification/push-notification/schema/pushNotification.schema';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PushNotificationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.createMappings();
      this.readMappings();
    };
  }

  createMappings() {
    this.mapper.createMap(BasePushNotificationDto, PushNotificationEntity);
    this.mapper.createMap(PushNotificationCreateDto, PushNotificationCreateEntity, {
      extends: [this.mapper.getMapping(BasePushNotificationDto, PushNotificationEntity)],
    });
    this.mapper.createMap(PushNotificationReadDto, PushNotificationReadDto, {
      extends: [this.mapper.getMapping(BaseEntity, BaseEntityDto)],
    });
    this.mapper.createMap(SendPushDto, SendPushEntity);
  }

  readMappings() {
    this.mapper.createMap(PushNotificationEntity, BasePushNotificationDto, {
      extends: [this.mapper.getMapping(BaseEntity, BaseEntityDto)],
    });
    this.mapper.createMap(PushNotificationCreateEntity, PushNotificationCreateDto, {
      extends: [this.mapper.getMapping(BaseEntity, BaseEntityDto)],
    });
    this.mapper.createMap(PushNotificationEntity, PushNotificationReadDto, {
      extends: [this.mapper.getMapping(BaseEntity, BaseEntityDto)],
    });

    this.mapper.createMap(ListQueryEntity, ListQueryDto);
    this.mapper.createMap(SendPushEntity, SendPushDto);
  }
}
