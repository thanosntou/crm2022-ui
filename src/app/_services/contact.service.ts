import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoginModel} from '../_models/login.model';
import {Injectable} from '@angular/core';
import {ServerUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserModel} from '../_models/user.model';
import {Observable} from 'rxjs';
import {ContactModel} from '../_models/contact.model';
import {CountryModel} from '../_models/country.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) {
  }

  create(form: ContactModel): Observable<ContactModel> {
    return this.http.post<ContactModel>(ServerUrl.B1 + '/api/v1/contact', form);
  }

  getAll(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(ServerUrl.B1 + '/api/v1/contact');
  }

  getOne(id: number) {
    return this.http.get<ContactModel>(ServerUrl.B1 + '/api/v1/contact/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(ServerUrl.B1 + '/api/v1/contact/' + id);
  }

  getSupportedCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(ServerUrl.B1 + '/api/v1/contact/countries');
  }

  getSupportedBusinessTypes(): Observable<string[]> {
    return this.http.get<string[]>(ServerUrl.B1 + '/api/v1/contact/business-types');
  }
}
