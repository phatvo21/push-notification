import { CHANNEL } from '@app/notification/push-notification/pushNotification.const';
import { PushNotificationEntity } from '@app/notification/push-notification/schema/pushNotification.schema';
import { Logger } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';

import { NotificationActions } from '../notification.actions';
import { NotificationStrategy } from '../notification.strategy';

export class UI extends NotificationStrategy implements NotificationActions {
  protected readonly logger = new Logger('UI Channel');

  private pushNotificationModel = getModelForClass(PushNotificationEntity);

  constructor() {
    super();
  }

  async sendNotify<T extends { firstName: string; companyName: string; userId: string; companyId: string }>(
    data: T,
  ): Promise<void> {
    const { userId, companyId, firstName } = data;
    const content = `Happy Birthday ${firstName}`;
    const channel = CHANNEL.ui;

    this.logger.log(`Create UI notification: ${JSON.stringify({ userId, companyId, content, channel })}`);

    await this.pushNotificationModel.create({ userId, companyId, content, channel });
  }
}
