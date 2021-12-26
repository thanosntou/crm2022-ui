import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ImportModel} from '../_models/import.model';

@Injectable({providedIn: 'root'})
export class ImportService {

  constructor(private http: HttpClient, public authService: AuthenticationService) {
  }

  getAll(): Observable<ImportModel[]> {
    return this.http.get<ImportModel[]>('/api/v1/import');
  }

  getOne(id: number) {
    return this.http.get<ImportModel>('/api/v1/import/' + id);
  }
}
