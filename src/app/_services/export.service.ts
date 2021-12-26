import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ExportModel} from '../_models/export.model';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class ExportService extends BaseService {

  constructor(private http: HttpClient, public authService: AuthenticationService) {
    super();
  }

  getAll(): Observable<ExportModel[]> {
    return this.http.get<ExportModel[]>(this.BE_URL + '/api/v1/export');
  }

  getOne(id: number) {
    return this.http.get<ExportModel>(this.BE_URL + '/api/v1/export/' + id);
  }

}
