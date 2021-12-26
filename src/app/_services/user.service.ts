import {UserModel} from '../_models/user.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class UserService extends BaseService {

  constructor(private authService: AuthenticationService, private http: HttpClient) {
    super();
  }

  findById(id: number) {
    return this.http.get<UserModel>(this.BE_URL + '/api/v1/user?id=' + id, this.authService.jsonHeaders());
  }
}
