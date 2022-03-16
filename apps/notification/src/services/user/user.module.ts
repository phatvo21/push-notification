import { UserService } from '@app/notification/services/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
