import { PushNotificationCreateEntity } from '@app/notification/push-notification/dto/create/pushNotificationCreate.dto';
import { FindPushNotificationQuery } from '@app/notification/push-notification/dto/query/findPushNotification.query';
import { PushNotificationService } from '@app/notification/push-notification/pushNotification.service';
import { CompanyService } from '@app/notification/services/company/company.service';
import { NotificationChannelService } from '@app/notification/services/notification-channel/notification.channel.service';
import { UserService } from '@app/notification/services/user/user.service';
import { Test } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';

describe('PushNotificationService', () => {
  let pushNotificationService: PushNotificationService;
  const fakePushNotificationModel = jest.fn();
  const notificationData = {
    total: 1,
    notifications: [
      {
        _id: '-P7UD8SL_thc9cn2KrrDD',
        createdAt: '2022-03-16T19:31:50.794Z',
        updatedAt: '2022-03-16T19:31:50.794Z',
        content: 'This is notification UI',
        userId: '97827b3a-a529-11ec-b909-0242ac120002',
        companyId: '97827c70-a529-11ec-b909-0242ac120002',
        channel: 'ui',
        isRead: false,
      },
    ],
  };
  const sendPushResult = { success: true };
  const userData = {
    _id: '97826c58-a529-11ec-b909-0242ac120002',
    companyId: '97826f78-a529-11ec-b909-0242ac120002',
    subscribedChannels: ['ui', 'email'],
    firstName: 'first name 1',
  };
  const companyData = {
    _id: '97826f78-a529-11ec-b909-0242ac120002',
    subscribedChannels: [],
    users: [
      {
        _id: '97826c58-a529-11ec-b909-0242ac120002',
      },
    ],
    companyName: 'Test Company 1',
  };

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        findById: jest.fn(() => {
          return userData;
        }),
      }),
    };

    const CompanyServiceProvider = {
      provide: CompanyService,
      useFactory: () => ({
        findById: jest.fn(() => {
          return companyData;
        }),
      }),
    };

    const NotificationChannelServiceProvider = {
      provide: NotificationChannelService,
      useFactory: () => ({
        uiChannel: jest.autoMockOn(),
        emailChannel: jest.autoMockOn(),
      }),
    };

    const PushNotificationServiceProvider = {
      provide: PushNotificationService,
      useFactory: () => ({
        sendPush: jest.fn(() => {
          return sendPushResult;
        }),
        findPushNotification: jest.fn(() => {
          return notificationData;
        }),
      }),
    };

    const app = await Test.createTestingModule({
      providers: [
        PushNotificationService,
        UserService,
        CompanyService,
        NotificationChannelService,
        PushNotificationServiceProvider,
        UserServiceProvider,
        CompanyServiceProvider,
        NotificationChannelServiceProvider,
        {
          provide: getModelToken('PushNotificationEntity'),
          useValue: fakePushNotificationModel,
        },
      ],
    }).compile();
    pushNotificationService = app.get<PushNotificationService>(PushNotificationService);
  });

  it('should send push notification success', async () => {
    const type = 'happy-birthday';
    const userId = '97826c58-a529-11ec-b909-0242ac120002';
    const companyId = '97826f78-a529-11ec-b909-0242ac120002';
    const entity = { type, userId, companyId } as PushNotificationCreateEntity;
    const result = await pushNotificationService.sendPush(entity);
    expect(result).toEqual(sendPushResult);
  });

  it('should returns notifications for a given user', async () => {
    const channel = 'ui';
    const userId = '97826c58-a529-11ec-b909-0242ac120002';
    const entity = { channel, userId } as FindPushNotificationQuery;
    const result = await pushNotificationService.findPushNotification(10, 1, undefined, undefined, entity);
    expect(result).toEqual(notificationData);
  });
});
