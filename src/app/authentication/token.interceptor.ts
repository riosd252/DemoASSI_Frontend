import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  newReq!: HttpRequest<any>;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.newReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('session-token')}`
      ),
    });
    return next.handle(this.newReq);
  }
}
