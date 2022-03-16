import { Constructible } from '@automapper/classes';
import { inheritAutoMapMetadata, inheritPropertyInitializers } from '@automapper/classes/mapped-types/src/lib/utils';
import { MappedType } from '@nestjs/mapped-types';
import { OmitType, PickType } from '@nestjs/swagger';

const swaggerPickType = PickType as any;

export const CustomPickType = <T, K extends keyof T>(
  classRef: Constructible<T>,
  keys: readonly K[],
): MappedType<Pick<T, typeof keys[number]>> => {
  const isInheritedPredicate = (propertyKey: string) => keys.includes(propertyKey as K);

  class MappedClass extends swaggerPickType(classRef, keys) {
    constructor() {
      super();
      inheritPropertyInitializers(this as Record<string, unknown>, classRef, isInheritedPredicate);
    }
  }

  inheritAutoMapMetadata(classRef, MappedClass, isInheritedPredicate);

  return MappedClass as MappedType<Pick<T, typeof keys[number]>>;
};



const swaggerOmitType = OmitType as any;

export const CustomOmitType = <T, K extends keyof T>(
  classRef: Constructible<T>,
  keys: readonly K[],
): MappedType<Omit<T, typeof keys[number]>> => {
  const isInheritedPredicate = (propertyKey: string) => keys.includes(propertyKey as K);

  class MappedClass extends swaggerOmitType(classRef, keys) {
    constructor() {
      super();
      inheritPropertyInitializers(this as Record<string, unknown>, classRef, isInheritedPredicate);
    }
  }

  inheritAutoMapMetadata(classRef, MappedClass, isInheritedPredicate);

  return MappedClass as MappedType<Omit<T, typeof keys[number]>>;
};


