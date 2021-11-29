import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { catchError, share } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class RequestInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 0:
            this.messageService.add({
              severity: 'error',
              summary: 'Oops',
              detail: 'Não foi possível conectar ao servidor.',
            });
            break;
          case 404:
            this.messageService.add({
              severity: 'error',
              summary: 'Tivemos um problema no nosso servidor',
              detail: err.error.message,
            });
            break;
          case 400:
            this.messageService.add({
              severity: 'warn',
              detail: err.error.message,
            });
            break;
          case 500:
            this.messageService.add({
              severity: 'error',
              summary: 'Tivemos um problema no nosso servidor',
              detail: err.error.message,
            })
        }
        return throwError(err.error);
      }),
      share()
    );
  }
}
