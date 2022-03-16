import { AutoMap } from '@automapper/classes';
import { Prop } from '@typegoose/typegoose';
import { nanoid } from 'nanoid';

export class BaseEntity {
  @AutoMap()
  @Prop({ type: String, default: () => nanoid() })
  _id: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
