import { PushNotificationEntity } from '@app/notification/push-notification/schema/pushNotification.schema';
import { NotificationChannelService } from '@app/notification/services/notification-channel/notification.channel.service';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([PushNotificationEntity])],
  providers: [NotificationChannelService],
  controllers: [],
  exports: [NotificationChannelService],
})
export class NotificationChannelModule {}
