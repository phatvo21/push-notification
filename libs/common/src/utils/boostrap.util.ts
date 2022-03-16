import { getAdapter } from '@app/common/utils/fastify.util';
import { getCommitHash } from '@app/common/utils/gitCommitHash.util';
import { AddSwagger } from '@app/common/utils/swagger.util';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import mongoose from 'mongoose';
import { Logger } from 'nestjs-pino';

import { AllExceptionsFilter } from './all-exceptions.filter';

export const bootstrap = async (appModule, swaggerConfig: { title: string; server: string }) => {
  const adapter = getAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(appModule, adapter);

  app.useLogger(app.get(Logger));

  const config = app.get(ConfigService);

  mongoose.set('debug', false);

  app.enableCors({
    credentials: true,
    origin: (_, cb) => {
      cb(null, true);
    },
  });

  await app.register(fastifyCookie);
  await app.register(fastifyCsrf);

  app.useGlobalFilters(new AllExceptionsFilter());
  const appHost = config.get<string>('app.host', '0.0.0.0');
  const appPort = config.get<number>('app.port', 3000);

  const commitHash = config.get<string>('COMMIT_HASH') || getCommitHash();
  AddSwagger(app, swaggerConfig.title, swaggerConfig.server, commitHash);

  await app.startAllMicroservices();
  await app.listen(appPort, appHost);
  console.info(`Swagger Url: ${appHost}:${appPort}${swaggerConfig.server}`);
};
