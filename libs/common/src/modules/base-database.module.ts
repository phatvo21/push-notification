import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('app.databaseUrl'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BaseDatabaseModule {}
