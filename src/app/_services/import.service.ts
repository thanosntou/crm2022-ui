import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ImportModel} from '../_models/import.model';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class ImportService extends BaseService {

  constructor(private http: HttpClient, public authService: AuthenticationService) {
    super();
  }

  getAll(): Observable<ImportModel[]> {
    return this.http.get<ImportModel[]>(this.BE_URL + '/api/v1/import');
  }

  getOne(id: number) {
    return this.http.get<ImportModel>(this.BE_URL + '/api/v1/import/' + id);
  }
}
