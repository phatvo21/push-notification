import { Injectable, Scope } from '@nestjs/common';

import { Email } from './channel/email';
import { UI } from './channel/ui';
import { NotificationActions } from './notification.actions';
import { RegisterChannel } from './register.channel';

@Injectable({ scope: Scope.REQUEST })
export class NotificationChannelService {
  public uiChannel: NotificationActions;

  public emailChannel: NotificationActions;

  constructor() {
    this.register();
  }

  public register(): void {
    this.uiChannel = new RegisterChannel(new UI()).register();
    this.emailChannel = new RegisterChannel(new Email()).register();
  }
}
