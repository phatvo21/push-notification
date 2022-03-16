import { User } from '@app/notification/services/user/user.types';

export interface Company {
  _id: string;

  users: Array<Partial<User>>;

  subscribedChannels: Array<string>;

  companyName: string;
}
