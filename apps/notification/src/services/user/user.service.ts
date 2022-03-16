import { User } from '@app/notification/services/user/user.types';
import { Injectable, Scope } from '@nestjs/common';
import fs from 'fs';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  async findById(userId: string): Promise<User> {
    const filePath = `${process.cwd()}/apps/notification/src/services/user/data/user-data.json`;

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const { users } = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return users.find((user) => user._id === userId);
  }
}
