import { BaseProfile } from '@app/common/profiles/base.profile';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'api', pluginInitializer: classes }],
      singular: true,
    }),
  ],
  providers: [BaseProfile],
})
export class BaseMapperModule {}
