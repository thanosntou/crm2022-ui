import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { ContactModel } from '../_models/contact.model';
import { CountryModel } from '../_models/country.model';
import {BaseService} from './base.service';

@Injectable({ providedIn: 'root' })
export class ContactService extends BaseService {

  constructor(private http: HttpClient, public authService: AuthenticationService) {
    super();
  }

  create(form: ContactModel): Observable<ContactModel> {
    return this.http.post<ContactModel>(this.BE_URL + '/api/v1/contact', form);
  }

  update(id: number, contact: ContactModel): Observable<ContactModel> {
    return this.http.post<ContactModel>(this.BE_URL + '/api/v1/contact/' + id, JSON.stringify(contact));
  }

  importFromFile(file: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Ignore: 'true',
      }),
    };
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.BE_URL + '/api/v1/import', formData, httpOptions);
  }

  export(type: string): Observable<any> {
    if (type === 'EMAIL') {
      return this.http.post<any>(
        this.BE_URL + '/api/v1/export?type=EMAIL',
        null
      );
    } else {
      return this.http.post<Blob>(
        this.BE_URL + '/api/v1/export?type=DOWNLOAD',
        null,
        { responseType: 'blob' as 'json' }
      );
    }
  }

  sendEmail(form): Observable<void> {
    return this.http.post<void>(this.BE_URL + '/api/v1/email', {
      all: true,
      subject: form.subject,
      content: form.content,
      businessType: form.businessTypeForm,
    });
  }

  search(company: string): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(this.BE_URL + '/api/v1/contact/search?company=' + company);
  }

  getAll(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(this.BE_URL + '/api/v1/contact');
  }

  getOne(id: number) {
    return this.http.get<ContactModel>(this.BE_URL + '/api/v1/contact/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BE_URL + '/api/v1/contact/' + id);
  }

  deleteAll(): Observable<void> {
    return this.http.delete<void>(this.BE_URL + '/api/v1/contact');
  }

  getSupportedCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(
      this.BE_URL + '/api/v1/contact/countries'
    );
  }

  getSupportedBusinessTypes(): Observable<string[]> {
    return this.http.get<string[]>(
      this.BE_URL + '/api/v1/contact/business-types'
    );
  }
}
