import { MapInterceptor } from '@automapper/nestjs';
import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import InternalServerErrorDto from '../dto/internalServerError.dto';
import NotFoundDTO from '../dto/notFound.dto';

export const GetEndpoint = (summary: string, outputDto: Type<any>, entityType: Type<any>) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Entity returned successfully',
      type: outputDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Server Internal Error',
      type: InternalServerErrorDto,
    }),
    ApiNotFoundResponse({
      description: 'Entity not found',
      type: NotFoundDTO,
    }),
    UseInterceptors(MapInterceptor(outputDto, entityType)),
  );
