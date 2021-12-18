import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServerUrl} from '../_enums/ServerUrl.enum';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ContactModel} from '../_models/contact.model';
import {CountryModel} from '../_models/country.model';
import {ImportModel} from '../_models/import.model';

@Injectable({providedIn: 'root'})
export class ImportService {

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) {
  }

  getAll(): Observable<ImportModel[]> {
    return this.http.get<ImportModel[]>(ServerUrl.B1 + '/api/v1/import');
  }

  getOne(id: number) {
    return this.http.get<ImportModel>(ServerUrl.B1 + '/api/v1/import/' + id);
  }
}
