import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EmailModel} from '../_models/email.model';

@Injectable({providedIn: 'root'})
export class EmailService {

  constructor(private http: HttpClient) {
  }

  sent(): Observable<void>  {
    return this.http.post<void>('/api/v1/email/', null);
  }

  getAll(): Observable<EmailModel[]> {
    return this.http.get<EmailModel[]>('/api/v1/email');
  }

  getOne(id: number) {
    return this.http.get<EmailModel>('/api/v1/email/' + id);
  }

}
