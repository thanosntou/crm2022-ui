import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ExportModel} from '../_models/export.model';

@Injectable({providedIn: 'root'})
export class ExportService {

  constructor(private http: HttpClient, public authService: AuthenticationService) {
  }

  getAll(): Observable<ExportModel[]> {
    return this.http.get<ExportModel[]>('/api/v1/export');
  }

  getOne(id: number) {
    return this.http.get<ExportModel>('/api/v1/export/' + id);
  }

}
