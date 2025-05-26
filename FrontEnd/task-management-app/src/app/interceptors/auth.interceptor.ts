import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const credentials = localStorage.getItem('basicAuthToken');

  if (credentials) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${credentials}`,
      },
    });
    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.removeItem('basicAuthToken');
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
