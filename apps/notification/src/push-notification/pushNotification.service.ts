import { BaseService } from '@app/common/services/base.service';
import { PushNotificationCreateEntity } from '@app/notification/push-notification/dto/create/pushNotificationCreate.dto';
import { PushNotificationQuery } from '@app/notification/push-notification/dto/query/findPushNotification.query';
import { ListQueryEntity } from '@app/notification/push-notification/dto/read/listQueryDto/listQuery.entity';
import { SendPushEntity } from '@app/notification/push-notification/dto/read/sendPush.dto';
import { CHANNEL, NOTIFICATION_TYPE } from '@app/notification/push-notification/pushNotification.const';
import {
  PushNotificationDocument,
  PushNotificationEntity,
} from '@app/notification/push-notification/schema/pushNotification.schema';
import { CompanyService } from '@app/notification/services/company/company.service';
import { NotificationChannelService } from '@app/notification/services/notification-channel/notification.channel.service';
import { UserService } from '@app/notification/services/user/user.service';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { assign, forEach, isUndefined, keys,omitBy } from 'lodash';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable({ scope: Scope.REQUEST })
export class PushNotificationService extends BaseService<PushNotificationEntity> {
  protected readonly logger = new Logger(PushNotificationService.name);

  constructor(
    @InjectModel(PushNotificationEntity)
    private readonly pushNotificationModel: Model<PushNotificationDocument>,
    private readonly notificationChannelService: NotificationChannelService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {
    super(pushNotificationModel);
  }

  async sendPush(entity: PushNotificationCreateEntity): Promise<SendPushEntity> {
    const { type, companyId, userId } = entity;

    // Fetch user and company from other service
    const [user, company] = await Promise.all([
      this.userService.findById(userId),
      this.companyService.findById(companyId),
    ]);

    const isValidUser = company.users.some((com) => com._id === userId);
    const isValidCompany = user.companyId === companyId;

    if (!isValidUser && !isValidCompany) return { success: false };

    // Remove the duplicate results and combine into an array of channel
    const subscribedChannels = [...new Set([...user.subscribedChannels, ...company.subscribedChannels])];

    const { firstName } = user;
    const { companyName } = company;

    if (subscribedChannels.length === 0) return { success: false };

    const notificationType = NOTIFICATION_TYPE[type];
    const promise: Array<unknown> = [];
    let success = false;

    forEach(subscribedChannels, (subscribedChannel) => {
      if (notificationType[subscribedChannel] === CHANNEL.ui) {
        promise.push(this.notificationChannelService.uiChannel.sendNotify({ userId, companyId, firstName }));
        success = true;
      }
      if (notificationType[subscribedChannel] === CHANNEL.email) {
        promise.push(this.notificationChannelService.emailChannel.sendNotify({ companyName, firstName }));
        success = true;
      }
    });

    await Promise.all(promise);

    return { success };
  }

  async findPushNotification(
    limit: number,
    page: number,
    sortField: string,
    sortDirection: string,
    findPushNotificationsQuery: PushNotificationQuery,
  ): Promise<ListQueryEntity> {
    // we removed fields that are undefined in query object to avoid finding unnecessary fields
    const refactoredFindParticipantsQuery = omitBy(findPushNotificationsQuery, isUndefined);
    const findParticipantsQueryFields = keys(refactoredFindParticipantsQuery);

    const projection = assign(
      {},
      ...findParticipantsQueryFields.map((field) => {
        return { [field]: 1 };
      }),
    );

    const notifications = await this.findMany(refactoredFindParticipantsQuery, projection, {
      lean: true,
      ...(limit
        ? {
            limit,
          }
        : {}),
      ...(limit && page
        ? {
            skip: page * limit,
          }
        : {}),
      ...(sortField && sortDirection
        ? {
            sort: { [sortField]: parseInt(sortDirection, 10) },
          }
        : {}),
    });

    const total = await this.pushNotificationModel.countDocuments(refactoredFindParticipantsQuery);
    return {
      total,
      limit,
      page,
      notifications,
    };
  }
}
