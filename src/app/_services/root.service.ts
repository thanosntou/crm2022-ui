import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../_enums/ServerUrl.enum';
import {Observable} from 'rxjs';
import {TenantModel} from '../_models/tenant.model';
import {UserModel} from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) {
  }

  fetchTenants(): Observable<TenantModel[]> {
    return this.http.get<TenantModel[]>(ServerUrl.B1 + '/api/v1/root/tenants');
  }

  fetchUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(ServerUrl.B1 + '/api/v1/root/users');
  }

  fetchAdminsByTenant(tenantId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(ServerUrl.B1 + '/api/v1/root/tenants/' + tenantId + '/admins');
  }

  createTenant(name: string): Observable<TenantModel> {
    return this.http.post<TenantModel>(ServerUrl.B1 + '/api/v1/root/tenants', name);
  }

  createAdmin(form: string): Observable<UserModel> {
    return this.http.post<UserModel>(ServerUrl.B1 + '/api/v1/root/admin', form);
  }

  deleteAdminUser(admin: UserModel): Observable<UserModel> {
    return this.http.delete<UserModel>(ServerUrl.B1 + '/api/v1/root/admins/' + admin.id);
  }

  deleteTenant(tenant: TenantModel): Observable<UserModel> {
    return this.http.delete<UserModel>(ServerUrl.B1 + '/api/v1/root/tenants/' + tenant.id);
  }
}
