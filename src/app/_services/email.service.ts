import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServerUrl} from '../_enums/ServerUrl.enum';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ContactModel} from '../_models/contact.model';
import {CountryModel} from '../_models/country.model';
import {ExportModel} from '../_models/export.model';
import {EmailModel} from '../_models/email.model';

@Injectable({providedIn: 'root'})
export class EmailService {

  constructor(private http: HttpClient) {
  }

  sent(): Observable<void>  {
    return this.http.post<void>(ServerUrl.B1 + '/api/v1/email/', null);
  }

  getAll(): Observable<EmailModel[]> {
    return this.http.get<EmailModel[]>(ServerUrl.B1 + '/api/v1/email');
  }

  getOne(id: number) {
    return this.http.get<EmailModel>(ServerUrl.B1 + '/api/v1/email/' + id);
  }

}
