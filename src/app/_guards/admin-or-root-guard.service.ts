import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, CanActivateChild
} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class AdminOrRootGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdminOrRootPromise()
      .then((result) => {
        if (result) {
          return true;
        } else {
          this.router.navigate(['login']);
        }
      });
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
