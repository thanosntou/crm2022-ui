import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { ContactModel } from '../_models/contact.model';
import { CountryModel } from '../_models/country.model';

@Injectable({ providedIn: 'root' })
export class ContactService {

  constructor(private http: HttpClient, public authService: AuthenticationService) {
  }

  create(form: ContactModel): Observable<ContactModel> {
    return this.http.post<ContactModel>('/api/v1/contact', form);
  }

  importFromFile(file: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Ignore: 'true',
      }),
    };
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>('/api/v1/import', formData, httpOptions);
  }

  export(type: string): Observable<any> {
    if (type === 'EMAIL') {
      return this.http.post<any>('/api/v1/export?type=EMAIL', null);
    } else {
      return this.http.post<Blob>('/api/v1/export?type=DOWNLOAD', null, { responseType: 'blob' as 'json' }
      );
    }
  }

  sendEmail(form): Observable<void> {
    return this.http.post<void>('/api/v1/email', { all: true, subject: form.subject, content: form.content });
  }

  getAll(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>('/api/v1/contact');
  }

  getOne(id: number) {
    return this.http.get<ContactModel>('/api/v1/contact/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/v1/contact/' + id);
  }

  getSupportedCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>('/api/v1/contact/countries');
  }

  getSupportedBusinessTypes(): Observable<string[]> {
    return this.http.get<string[]>('/api/v1/contact/business-types');
  }
}
