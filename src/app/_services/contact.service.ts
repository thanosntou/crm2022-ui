import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServerUrl} from '../_enums/ServerUrl.enum';
import {AuthenticationService} from './authentication.service';
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

  importFromFile(file: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Ignore': 'true'})
    };
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(ServerUrl.B1 + '/api/v1/contact/import', formData, httpOptions);
  }

  export(): Observable<void> {
    return this.http.post<void>(ServerUrl.B1 + '/api/v1/contact/export', null);
  }

  download(): Observable<Blob> {
    return this.http.post<Blob>(ServerUrl.B1 + '/api/v1/contact/download', null, {responseType: 'blob' as 'json'});
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
