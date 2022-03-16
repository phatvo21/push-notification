import { Logger } from '@nestjs/common';

import { NotificationActions } from '../notification.actions';
import { NotificationStrategy } from '../notification.strategy';

export class Email extends NotificationStrategy implements NotificationActions {
  protected readonly logger = new Logger('Email Channel');

  constructor() {
    super();
  }

  async sendNotify<T extends { firstName: string; companyName: string }>(data: T): Promise<void> {
    const { companyName, firstName } = data;
    this.logger.log(`Send email notification: ${JSON.stringify({ companyName, firstName })}`);
    await this.sendEmail({ companyName, firstName });
  }
}
