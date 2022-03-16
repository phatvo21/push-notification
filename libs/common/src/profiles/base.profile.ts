import { BaseEntityDto } from '@app/common/dto';
import { BaseEntity } from '@app/common/schemas/base.schema';
import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(BaseEntity, BaseEntityDto)
        .forMember(
          (e) => e._id,
          mapFrom((e) => e._id),
        )
        .forMember(
          (e) => e.createdAt,
          mapFrom((e) => new Date(e.createdAt)),
        )
        .forMember(
          (e) => e.updatedAt,
          mapFrom((e) => new Date(e.updatedAt)),
        )
    };
  }
}
