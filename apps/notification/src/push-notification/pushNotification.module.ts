import { PushNotificationProfile } from '@app/notification/push-notification/profile/pushNotification.profile';
import { PushNotificationController } from '@app/notification/push-notification/pushNotification.controller';
import { PushNotificationService } from '@app/notification/push-notification/pushNotification.service';
import { PushNotificationEntity } from '@app/notification/push-notification/schema/pushNotification.schema';
import { CompanyModule } from '@app/notification/services/company/company.module';
import { NotificationChannelModule } from '@app/notification/services/notification-channel/notification.channel.module';
import { UserModule } from '@app/notification/services/user/user.module';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([PushNotificationEntity]), UserModule, CompanyModule, NotificationChannelModule],
  providers: [PushNotificationService, PushNotificationProfile],
  controllers: [PushNotificationController],
  exports: [TypegooseModule.forFeature([PushNotificationEntity])],
})
export class PushNotificationModule {}
