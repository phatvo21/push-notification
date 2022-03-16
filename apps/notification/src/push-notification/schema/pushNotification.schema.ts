import { BaseEntity } from '@app/common/schemas/base.schema';
import { channel } from '@app/notification/push-notification/pushNotification.const';
import { AutoMap } from '@automapper/classes';
import { modelOptions, Prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export type PushNotificationDocument = PushNotificationEntity & Document;

@modelOptions({
  schemaOptions: {
    collection: 'notifications',
  },
})
export class PushNotificationEntity extends BaseEntity {
  @AutoMap()
  @Prop({ required: true })
  content: string;

  @AutoMap()
  @Prop({ required: true })
  userId: string;

  @AutoMap()
  @Prop({ required: true })
  companyId: string;

  @AutoMap()
  @Prop({ type: String, enum: channel, required: true })
  channel: string;

  @AutoMap()
  @Prop({ default: false })
  isRead: boolean;
}
