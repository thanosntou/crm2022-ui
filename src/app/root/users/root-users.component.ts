import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../_services/authentication.service';
import {RootService} from '../../_services/root.service';
import {TenantModel} from '../../_models/tenant.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../_models/user.model';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tenants',
  templateUrl: './root-users.component.html',
  styleUrls: ['./root-users.component.css']
})
export class RootUsersComponent implements OnInit {
  isNewTenantFormOpen = true;
  tenants: TenantModel[] = [];
  allUsers: UserModel[] = [];
  admins: UserModel[] = [];
  newTenantForm: FormGroup;
  newAdminForm: FormGroup;
  angleDownIcon = faAngleDown;
  faAngleDoubleDown = faAngleDoubleDown;

  constructor(private http: HttpClient,
              public authService: AuthenticationService,
              private rootService: RootService
  ) { }

  ngOnInit() {
    this.rootService.fetchTenants().subscribe((tenants) => this.tenants = tenants);
    this.rootService.fetchUsers().subscribe((users) => this.allUsers = users);
    this.newTenantForm = new FormGroup({
      'name': new FormControl(null)
      });
    this.newAdminForm = new FormGroup({
      'tenantId': new FormControl(null),
      'username': new FormControl(null),
      'email': new FormControl(null),
      'pass': new FormControl(null)
    });
  }

  onSaveTenant() {
    const name = this.newTenantForm.get('name').value;
    this.rootService.createTenant(name).subscribe((tenant) => {
      this.tenants.push(tenant);
      this.newTenantForm.get('name').reset();
    });
  }

  onSaveAdmin() {
    this.newAdminForm.setControl('confirmPass', this.newAdminForm.get('pass'));
    const form = this.newAdminForm.value;
    this.rootService.createAdmin(form).subscribe((admin) => {
      this.admins.push(admin);
      this.allUsers.push(admin);
      this.newAdminForm.get('tenantId').reset();
      this.newAdminForm.get('username').reset();
      this.newAdminForm.get('email').reset();
      this.newAdminForm.get('pass').reset();
      this.newAdminForm.get('confirmPass').reset();
    });
  }

  fetchAdminsOfTenant(tenant: TenantModel) {
    this.rootService.fetchAdminsByTenant(tenant.id).subscribe((admins) => this.admins = admins);
  }

  onDeleteAdmin(admin: UserModel, tenant: TenantModel) {
    if (confirm('Are you sure to delete the admin: "' + admin.username + '" of tenant: "' + tenant.name + '" ?')) {
      this.rootService.deleteAdminUser(admin).subscribe((deletedAdmin) =>
        this.admins = this.admins.filter(f => f.id !== deletedAdmin.id));
    }
  }

  onDeleteTenant(tenant: TenantModel) {
    if (confirm('Are you sure to delete the tenant: "' + tenant.name + '" ?\n' +
      'The admin will get deleted, too!')) {
      this.rootService.deleteTenant(tenant).subscribe((deletedTenant) =>
        this.tenants = this.tenants.filter(f => f.id !== deletedTenant.id));
    }
  }
}
