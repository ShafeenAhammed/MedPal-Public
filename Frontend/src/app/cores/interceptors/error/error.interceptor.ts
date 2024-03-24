import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('Response Interceptor:', event);
        }
      }),
      catchError(error => {
        console.error('Error Interceptor:', error);
        if (error.status === 401) {
          this.router.navigate(['/error']);
        } else if (error.status === 404) {
          this.router.navigate(['/error']);
        } else {
          this.router.navigate(['/error']);
        }
        return throwError(()=>error);
      })
    );
  }
}
