import { BaseEntity } from '@app/common/schemas/base.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { assign, isEmpty, map } from 'lodash';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { nanoid } from 'nanoid';

export abstract class BaseService<T extends BaseEntity> {
  protected abstract readonly logger: Logger;

  protected BaseModel: Model<any & T>;

  protected constructor(protected readonly baseModel: Model<any & T>) {
    this.BaseModel = baseModel;
  }

  parse(entity): T {
    return entity.toJSON() as T;
  }

  async findById(
    id: string,
    projection?: any | null,
    options?: (QueryOptions & { suppressNotFound?: boolean }) | null,
  ): Promise<Partial<T>> {
    const calledId = nanoid();
    this.logger.log({ calledId, id }, '.findById called');
    return this.findOne({ _id: id }, projection, options);
  }

  async findOne(
    filter: FilterQuery<T & any>,
    projection?: any | null,
    options?: (QueryOptions & { suppressNotFound?: boolean }) | null,
  ): Promise<T> {
    const defaultProjection = { 'history.previousData': 0 };
    const queryProjection = isEmpty(projection) ? defaultProjection : projection;

    const defaultOptions = { lean: true };
    const queryOptions = assign(defaultOptions, options || {});

    const calledId = nanoid();
    this.logger.log({ calledId, filter, projection, options }, '.findOne called');

    let result;

    try {
      result = await this.BaseModel.findOne(filter, queryProjection, queryOptions).exec();

      if (queryOptions.suppressNotFound) return result;

      if (!result) throw new NotFoundException();
    } catch (error) {
      this.logger.warn({ error, calledId, filter, projection, options }, '.findOne thrown error!');
      throw error;
    }

    this.logger.log({ calledId, filter, projection, options }, '.findOne found result');

    return result;
  }

  async findMany(
    filter: FilterQuery<T & any>,
    projection: any | null = { 'history.previousData': 0 },
    options?: (QueryOptions & { suppressNotFound?: boolean }) | null,
  ): Promise<Array<T> | null> {
    const calledId = nanoid();
    this.logger.log({ calledId, filter, projection, options }, '.findMany called');

    const defaultOptions = { lean: true };
    const queryOptions = assign(defaultOptions, options || {});

    const result = await this.BaseModel.find(filter, projection, queryOptions).exec();

    this.logger.log({ calledId, ids: map(result, '_id') }, '.findById found result');
    return result;
  }

  async create(entity: Partial<T>): Promise<T> {
    const calledId = nanoid();

    delete entity._id;
    delete entity.createdAt;
    delete entity.updatedAt;

    this.logger.log({ calledId, entity }, '.create called');
    const newEntity = await new this.BaseModel(entity).save();
    this.logger.log({ calledId, id: newEntity.id }, '.create success');
    return this.parse(newEntity);
  }

  async findManyByIds(ids: string[], projection?: any | null, options?: QueryOptions | null): Promise<Array<T> | null> {
    const calledId = nanoid();
    this.logger.log({ calledId, ids, projection, options }, '.findManyByIds called');

    return this.findMany({ _id: ids }, projection, options);
  }

  updateById(id: string, entity: Partial<T>): Promise<T> {
    const calledId = nanoid();
    this.logger.log({ calledId, id, entity }, '.updateById called');
    return this.update({ _id: id }, entity);
  }

  async update(filter: FilterQuery<T & any>, entity: Partial<T>): Promise<T> {
    const calledId = nanoid();
    this.logger.log({ calledId, filter, entity }, '.update called');

    delete entity._id;
    delete entity.createdAt;
    delete entity.updatedAt;

    let result;
    try {
      const oldEntity = await this.findOne(filter);

      if (!oldEntity) throw new NotFoundException();

      const updatePayload = {
        $set: entity,
      };

      result = await this.BaseModel.findOneAndUpdate(filter, updatePayload, { new: true }).lean().exec();
    } catch (error) {
      this.logger.warn({ error, calledId }, '.update thrown error!');
      throw error;
    }

    this.logger.log({ calledId }, '.updateById success');
    return result;
  }

  async deleteById(id: string) {
    const calledId = nanoid();
    this.logger.log({ calledId, id }, '.delete called');

    return this.BaseModel.deleteOne({ _id: id });
  }

  async deleteMany(filter: FilterQuery<T & any>): Promise<any> {
    const calledId = nanoid();
    this.logger.log({ calledId, filter }, '.deleteMany called');

    return this.BaseModel.deleteMany(filter).exec();
  }
}
