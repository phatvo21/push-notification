import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import InternalServerErrorDto from '../dto/internalServerError.dto';
import NotFoundDTO from '../dto/notFound.dto';

export const DeleteEndpoint = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Deleted successfully',
    }),
    ApiInternalServerErrorResponse({
      description: 'Server Internal Error',
      type: InternalServerErrorDto,
    }),
    ApiNotFoundResponse({
      description: 'Entity not found',
      type: NotFoundDTO,
    }),
    ApiParam({ name: 'id', type: String, example: '60d0161cba52d105504fae34' }),
  );
