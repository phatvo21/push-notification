import { MapInterceptor } from '@automapper/nestjs';
import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import InternalServerErrorDto from '../dto/internalServerError.dto';

export const ListEndpoint = (summary: string, outputDto: Type<any>, entityType: Type<any>) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'List returned successfully',
      type: [outputDto],
    }),
    ApiInternalServerErrorResponse({
      description: 'Server Internal Error',
      type: InternalServerErrorDto,
    }),
    UseInterceptors(MapInterceptor(outputDto, entityType, { isArray: true })),
  );
