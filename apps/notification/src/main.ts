import { bootstrap } from '@app/common/utils/boostrap.util';
import { AppModule } from '@app/notification/app.module';

bootstrap(AppModule, { title: 'Notification API', server: '/ws-notification' });
