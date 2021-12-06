import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401){
          this.loginService.logout()
      }
      return throwError(error);
    }));
  }
}
