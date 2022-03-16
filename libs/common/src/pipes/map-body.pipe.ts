import { MapPipe } from '@automapper/nestjs';
import { Body, Type, ValidationPipe } from '@nestjs/common';

export const MapBody = (from: Type<any>, to: Type<any>, isArray?: boolean) =>
  Body(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      expectedType: from,
    }),
    MapPipe(to, from, { isArray }),
  );
