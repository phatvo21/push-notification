import { CompanyService } from '@app/notification/services/company/company.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [CompanyService],
  controllers: [],
  exports: [CompanyService],
})
export class CompanyModule {}
