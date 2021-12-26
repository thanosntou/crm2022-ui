import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../_models/login.model';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {UserModel} from '../_models/user.model';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {

  constructor(private http: HttpClient, public authService: AuthenticationService) {
    super();
  }

  fetchLogins() {
    return this.http.get<LoginModel[]>(this.BE_URL + '/api/v1/admin/logins');
  }

  fetchUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.BE_URL + '/api/v1/admin/users');
  }

  deleteUser(id: number) {
    return this.http.delete<UserModel>(this.BE_URL + '/api/v1/root/users/' + id);
  }

  hideUser(id: number) {
    return this.http.post<UserModel>(this.BE_URL + '/api/v1/user/hide', 'id=' + id);
  }
}
