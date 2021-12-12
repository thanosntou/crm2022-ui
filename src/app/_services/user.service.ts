import {UserModel} from '../_models/user.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../_enums/ServerUrl.enum';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  findById(id: number) {
    return this.http.get<UserModel>(ServerUrl.B1 + '/api/v1/user?id=' + id, this.authService.jsonHeaders());
  }
}
