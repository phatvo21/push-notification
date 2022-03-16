import { HealthController } from '@app/common/controllers/health.controller';
import { BaseConfigModule } from '@app/common/modules/base-config.module';
import { BaseDatabaseModule } from '@app/common/modules/base-database.module';
import { BaseLoggerModule } from '@app/common/modules/base-logger.module';
import { BaseMapperModule } from '@app/common/modules/base-mapper.module';
import { Module } from '@nestjs/common';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';

@Module({
  imports: [
    BaseConfigModule,
    BaseLoggerModule,
    BaseDatabaseModule,
    BaseMapperModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: './i18n/',
        watch: true,
      },
    }),
  ],
  controllers: [HealthController],
})
export class BaseModule {}
