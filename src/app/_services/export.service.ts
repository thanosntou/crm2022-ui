import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServerUrl} from '../_enums/ServerUrl.enum';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ContactModel} from '../_models/contact.model';
import {CountryModel} from '../_models/country.model';
import {ExportModel} from '../_models/export.model';

@Injectable({providedIn: 'root'})
export class ExportService {

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) {
  }

  getAll(): Observable<ExportModel[]> {
    return this.http.get<ExportModel[]>(ServerUrl.B1 + '/api/v1/export');
  }

  getOne(id: number) {
    return this.http.get<ExportModel>(ServerUrl.B1 + '/api/v1/export/' + id);
  }

}
