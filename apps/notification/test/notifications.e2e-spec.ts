/* eslint-disable max-lines */
import { BaseModule } from '@app/common/modules';
import {
  generateMockServer,
  generateRequest,
  getModel,
  RequestType,
  restoreDb,
  wait,
} from '@app/common/utils/database-test.util';
import { PushNotificationModule } from '@app/notification/push-notification/pushNotification.module';
import {
  PushNotificationDocument,
  PushNotificationEntity,
} from '@app/notification/push-notification/schema/pushNotification.schema';
import { CompanyModule } from '@app/notification/services/company/company.module';
import { NotificationChannelModule } from '@app/notification/services/notification-channel/notification.channel.module';
import { UserModule } from '@app/notification/services/user/user.module';
import { Mapper } from '@automapper/types';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Model } from 'mongoose';

describe('notifications (e2e)', () => {
  let server: { app: NestFastifyApplication; mapper: Mapper };
  let request: RequestType;
  let notificationsModel: Model<PushNotificationDocument>;

  beforeAll(async () => {
    await restoreDb();
    server = await generateMockServer([
      BaseModule,
      PushNotificationModule,
      UserModule,
      CompanyModule,
      NotificationChannelModule,
    ]);
    request = generateRequest(server);
    notificationsModel = getModel(server, 'PushNotificationEntity');
  });

  afterAll(async () => {
    await server.app.close();
  });

  describe('Create notifications', () => {
    it('should return error when User and Company does not match', async () => {
      await request.agent.post('/notifications').send({
        companyId: '97827c70-a529-11ec-b909-0242ac120002',
        userId: '97826c58-a529-11ec-b909-0242ac120002',
        type: 'happy-birthday',
      });
      expect('User and Company does not match').toBeString();
    });

    it('should return false if current user/company does not subscribed to any channels', async () => {
      const testRes = await request.agent.post('/notifications').send({
        companyId: '67543c70-a529-11ec-b909-0242ac198732',
        userId: '87543b3a-a529-11ec-b909-0242ac137789',
        type: 'happy-birthday',
      });
      expect(testRes.statusCode).toEqual(201);
      expect(testRes.body.success).toEqual(false);
    });

    it('should send notification when type is happy-birthday', async () => {
      const testRes = await request.agent.post('/notifications').send({
        companyId: '97826f78-a529-11ec-b909-0242ac120002',
        userId: '97826c58-a529-11ec-b909-0242ac120002',
        type: 'happy-birthday',
      });
      expect(testRes.statusCode).toEqual(201);
      expect(testRes.body.success).toEqual(true);

      await wait(5000);

      const testEnt = await notificationsModel.find({
        channel: 'ui',
        userId: '97826c58-a529-11ec-b909-0242ac120002',
      });
      expect(testEnt[0].channel).toEqual('ui');
      expect(testEnt[0].userId).toEqual('97826c58-a529-11ec-b909-0242ac120002');
      expect(testEnt[0].companyId).toEqual('97826f78-a529-11ec-b909-0242ac120002');
    });

    it('should send notification when type is monthly-payslip', async () => {
      const testRes = await request.agent.post('/notifications').send({
        companyId: '97827c70-a529-11ec-b909-0242ac120002',
        userId: '97827b3a-a529-11ec-b909-0242ac120002',
        type: 'monthly-payslip',
      });
      expect(testRes.statusCode).toEqual(201);
      expect(testRes.body.success).toEqual(true);

      await wait(5000);

      const testEnt = await notificationsModel.find({
        channel: 'ui',
        userId: '978271a8-a529-11ec-b909-0242ac120002',
      });
      expect(testEnt).toHaveLength(0);
    });

    it('should send notification when type is leave-balance-reminder', async () => {
      const testRes = await request.agent.post('/notifications').send({
        companyId: '978279b4-a529-11ec-b909-0242ac120002',
        userId: '978271a8-a529-11ec-b909-0242ac120002',
        type: 'leave-balance-reminder',
      });
      expect(testRes.statusCode).toEqual(201);
      expect(testRes.body.success).toEqual(true);

      await wait(5000);

      const testEnt = await notificationsModel.find({
        channel: 'ui',
        userId: '978271a8-a529-11ec-b909-0242ac120002',
      });
      expect(testEnt[0].channel).toEqual('ui');
      expect(testEnt[0].userId).toEqual('978271a8-a529-11ec-b909-0242ac120002');
      expect(testEnt[0].companyId).toEqual('978279b4-a529-11ec-b909-0242ac120002');
    });
  });

  describe('List notifications', () => {
    let entity: PushNotificationEntity;
    beforeAll(async () => {
      entity = await notificationsModel.create({
        companyId: '97827c70-a529-11ec-b909-0242ac120002',
        userId: '97827b3a-a529-11ec-b909-0242ac120002',
        channel: 'ui',
        content: 'This is notification UI',
      });

      await notificationsModel.create({
        companyId: '67543c70-a529-11ec-b909-0242ac198732',
        userId: '87543b3a-a529-11ec-b909-0242ac137789',
        channel: 'ui',
        content: 'This is second notification UI 2',
      });
    });
    afterAll(async () => {
      await restoreDb();
    });

    it('should return list of all notifications for a given user and specific channel', async () => {
      // eslint-disable-next-line no-secrets/no-secrets
      const res = await request.agent.get(`/notifications?userId=97827b3a-a529-11ec-b909-0242ac120002&channel=ui`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.total).toEqual(1);
      expect(res.body.notifications[0].companyId).toEqual(entity.companyId);
      expect(res.body.notifications[0].userId).toEqual(entity.userId);
      expect(res.body.notifications[0].channel).toEqual(entity.channel);
      expect(res.body.notifications[0].content).toEqual(entity.content);
    });

    it('should not return notification for no matching userId', async () => {
      // eslint-disable-next-line no-secrets/no-secrets
      const res = await request.agent.get(`/notifications?userId=97827b3a-a529-11ec-b909&channel=ui`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.total).toEqual(0);
      expect(res.body.notifications).toHaveLength(0);
    });
  });
});
