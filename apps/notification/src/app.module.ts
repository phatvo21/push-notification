import { BaseModule } from '@app/common/modules';
import { PushNotificationModule } from '@app/notification/push-notification/pushNotification.module';
import { CompanyModule } from '@app/notification/services/company/company.module';
import { NotificationChannelModule } from '@app/notification/services/notification-channel/notification.channel.module';
import { UserModule } from '@app/notification/services/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BaseModule, PushNotificationModule, UserModule, CompanyModule, NotificationChannelModule],
})
export class AppModule {}
