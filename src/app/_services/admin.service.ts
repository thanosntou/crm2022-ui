import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoginModel} from '../_models/login.model';
import {Injectable} from '@angular/core';
import {ServerUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserModel} from '../_models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) {
  }

  fetchLogins() {
    return this.http.get<LoginModel[]>(ServerUrl.B1 + '/api/v1/admin/logins');
  }

  fetchUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(ServerUrl.B1 + '/api/v1/admin/users');
  }

  deleteUser(id: number) {
    return this.http.delete<UserModel>(ServerUrl.B1 + '/api/v1/root/users/' + id);
  }

  hideUser(id: number) {
    return this.http.post<UserModel>(ServerUrl.B1 + '/api/v1/user/hide', 'id=' + id);
  }

}
