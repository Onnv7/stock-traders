import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap, timestamp } from 'rxjs';
import { ResponseAPI } from '../dto/response-api.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseAPI<T>> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);

    return next.handle().pipe(
      map((responseData) => {
        return {
          success: true,
          timestamp: new Date(),
          ...responseData,
        };
      }),
    );
  }
}
