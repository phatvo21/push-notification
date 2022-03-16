import { getAdapter } from '@app/common/utils/fastify.util';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelWithString } from '@typegoose/typegoose';
import { exec } from 'child_process';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import supertest from 'supertest';
// eslint-disable-next-line unicorn/import-style
import util from 'util';

export const execAsync = util.promisify(exec);

export const restoreDb = async (database = 'notification.archive', collection = '*', dbPath = 'database') => {
  console.info('Begin restore', database, collection);

  await execAsync(
    `mongorestore --host localhost:27017 -u mongo -p mongo --nsInclude="notification.${collection}" --gzip --archive=${dbPath}/${database} --drop --noIndexRestore --quiet --numParallelCollections=4 --numInsertionWorkersPerCollection=2`,
  );
  console.info('Restored:', database, collection);
};

export interface ServerType {
  app: NestFastifyApplication;
  mapper: Mapper;
}
export interface RequestType {
  agent: supertest.SuperTest<supertest.Test>;
  bearer: string;
}

export const generateRequest = (server: { app: NestFastifyApplication }) => {
  const agent = supertest.agent(server.app.getHttpServer());
  return {
    agent,
  };
};

export const generateMockServer = async (modules = []) => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: modules,
  }).compile();

  const adapter = getAdapter();
  const app = moduleFixture.createNestApplication<NestFastifyApplication>(adapter);

  await app.register(fastifyCookie);
  await app.register(fastifyCsrf);
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
  const mapper = app.get(getMapperToken());
  return {
    app,
    mapper,
  };
};

export const getModel = (server: { app: NestFastifyApplication }, entityName: string) =>
  server.app.get(getModelWithString(entityName));

export const wait = async (time = 500) => new Promise((resolve) => setTimeout(() => resolve(''), time));
