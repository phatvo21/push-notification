import { PushNotificationCreateEntity } from '@app/notification/push-notification/dto/create/pushNotificationCreate.dto';
import { FindPushNotificationQuery } from '@app/notification/push-notification/dto/query/findPushNotification.query';
import { PushNotificationController } from '@app/notification/push-notification/pushNotification.controller';
import { PushNotificationService } from '@app/notification/push-notification/pushNotification.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('PushNotificationController', () => {
  let pushNotificationController: PushNotificationController;
  let pushNotificationService: PushNotificationService;
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

  beforeEach(async () => {
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
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PushNotificationController],
      providers: [PushNotificationService, PushNotificationServiceProvider],
    }).compile();

    pushNotificationController = app.get<PushNotificationController>(PushNotificationController);
    pushNotificationService = app.get<PushNotificationService>(PushNotificationService);
  });

  it('should call sendPush for sending notification', async () => {
    const type = 'happy-birthday';
    const userId = '97826c58-a529-11ec-b909-0242ac120002';
    const companyId = '97826f78-a529-11ec-b909-0242ac120002';
    const body = { type, userId, companyId } as PushNotificationCreateEntity;
    await pushNotificationController.create(body);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(pushNotificationService.sendPush).toHaveBeenCalled();
  });

  it('should retrieve the success from sendPush', async () => {
    const type = 'happy-birthday';
    const userId = '97826c58-a529-11ec-b909-0242ac120002';
    const companyId = '97826f78-a529-11ec-b909-0242ac120002';
    const body = { type, userId, companyId } as PushNotificationCreateEntity;
    expect(pushNotificationService.sendPush(body)).toBe(sendPushResult);
  });

  it('should call findPushNotification to fetching the data', async () => {
    const channel = 'ui';
    const userId = '97826c58-a529-11ec-b909-0242ac120002';
    const query = { channel, userId } as FindPushNotificationQuery;
    await pushNotificationController.find(query);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(pushNotificationService.findPushNotification).toHaveBeenCalled();
  });

  it('should retrieve the data from findPushNotification', async () => {
    const channel = 'ui';
    const userId = '97826c58-a529-11ec-b909-0242ac120002';
    const query = { channel, userId } as FindPushNotificationQuery;
    expect(pushNotificationService.findPushNotification(10, 1, undefined, undefined, query)).toBe(notificationData);
  });
});
