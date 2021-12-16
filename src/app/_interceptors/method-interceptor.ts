import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MethodInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this check is done for the case of the login call, that already have Basic auth
    // Also, the 'Ignore' condition is useful when i want to exclude other calls, which i dont want to add Content-Type
    if (req.method === 'POST' && !req.headers.has('Content-Type') && !req.headers.has('Ignore')) {
      const modifiedRequest = req.clone({headers: req.headers.append('Content-Type', 'application/json')});
      return next.handle(modifiedRequest);
    }
    return next.handle(req);
  }
}
