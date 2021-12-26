import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EmailModel} from '../_models/email.model';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class EmailService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  sent(): Observable<void>  {
    return this.http.post<void>(this.BE_URL + '/api/v1/email/', null);
  }

  getAll(): Observable<EmailModel[]> {
    return this.http.get<EmailModel[]>(this.BE_URL + '/api/v1/email');
  }

  getOne(id: number) {
    return this.http.get<EmailModel>(this.BE_URL + '/api/v1/email/' + id);
  }

}
