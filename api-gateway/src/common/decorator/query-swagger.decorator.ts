import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

interface IQuery {
  name: string;
  example?: any;
  required?: boolean;
}

export const ApiQueryURL = (queries: IQuery[]) => {
  if (!queries) {
    return null;
  }
  const queryList = queries.map((item) => {
    return ApiQuery({
      name: item.name,
      example: item.example,
      required: item.required ?? false,
    });
  });
  return applyDecorators(...queryList);
};
