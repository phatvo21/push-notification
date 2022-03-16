import { Company } from '@app/notification/services/company/company.types';
import { Injectable, Scope } from '@nestjs/common';
import fs from 'fs';

@Injectable({ scope: Scope.REQUEST })
export class CompanyService {
  async findById(companyId: string): Promise<Company> {
    const filePath = `${process.cwd()}/apps/notification/src/services/company/data/company-data.json`;

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const { companies } = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return companies.find((company) => company._id === companyId);
  }
}
