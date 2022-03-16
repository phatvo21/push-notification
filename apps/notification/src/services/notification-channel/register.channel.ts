import { NotificationActions } from './notification.actions';

export class RegisterChannel {
  private readonly IChannel: NotificationActions;

  constructor(channel: NotificationActions) {
    this.IChannel = channel;
  }

  public register(): NotificationActions {
    return this.IChannel;
  }
}
