import { PushNotificationEntity } from '@app/notification/push-notification/schema/pushNotification.schema';
import { AutoMap } from '@automapper/classes';

export class ListQueryEntity {
  @AutoMap()
  total: number;

  @AutoMap()
  limit: number;

  @AutoMap()
  page: number;

  @AutoMap({ typeFn: () => PushNotificationEntity })
  notifications: PushNotificationEntity[];
}
