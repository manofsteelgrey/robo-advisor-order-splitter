import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';

  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const start = Date.now();

      return next.handle().pipe(
        tap(() => {
          const end = Date.now();
          const responseTime = end - start;

          const request = context.switchToHttp().getRequest();
          const { method, url } = request;

          console.log(`${method} ${url} - ${responseTime}ms`);
        }),
      );
    }
  }
