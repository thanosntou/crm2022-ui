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
  traders: UserModel[] = [];
  followers: UserModel[] = [];
  newTenantForm: FormGroup;
  newAdminForm: FormGroup;
  newTraderForm: FormGroup;
  newFollowerForm: FormGroup;
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
    this.newTraderForm = new FormGroup({
      'tenantId': new FormControl(null),
      'username': new FormControl(null),
      'email': new FormControl(null),
      'pass': new FormControl(null)
    });
    this.newFollowerForm = new FormGroup({
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

  onSaveTrader() {
    this.newTraderForm.setControl('confirmPass', this.newTraderForm.get('pass'));
    const form = this.newTraderForm.value;
    this.rootService.createTrader(form).subscribe((trader) => {
      this.traders.push(trader);
      this.allUsers.push(trader);
      this.newTraderForm.get('tenantId').reset();
      this.newTraderForm.get('username').reset();
      this.newTraderForm.get('email').reset();
      this.newTraderForm.get('pass').reset();
      this.newTraderForm.get('confirmPass').reset();
    });
  }

  onSaveFollower() {
    this.newFollowerForm.setControl('confirmPass', this.newFollowerForm.get('pass'));
    const form = this.newFollowerForm.value;
    this.rootService.createFollower(form).subscribe((follower) => {
      this.followers.push(follower);
      this.allUsers.push(follower);
      this.newFollowerForm.get('tenantId').reset();
      this.newFollowerForm.get('username').reset();
      this.newFollowerForm.get('email').reset();
      this.newFollowerForm.get('pass').reset();
      this.newFollowerForm.get('confirmPass').reset();
    });
  }

  fetchAdminsAndTradersOfTenant(tenant: TenantModel) {
    this.rootService.fetchAdminsByTenant(tenant.id).subscribe((admins) => this.admins = admins);
    this.rootService.fetchTradersByTenant(tenant.id).subscribe((traders) => this.traders = traders);
  }

  fetchFollowersOfTrader(trader: UserModel) {
    this.rootService.fetchFollowersByTrader(trader.id).subscribe((followers) => this.followers = followers);
  }

  onDeleteFollower(follower: UserModel, tenant: TenantModel) {
    if (confirm('Are you sure to delete the follower: "' + follower.username + '" of tenant: "' + tenant.name + '" ?')) {
      this.rootService.deleteFollowerUser(follower).subscribe((deletedUser) =>
        this.followers = this.followers.filter(f => f.id !== deletedUser.id));
    }
  }

  onDeleteTrader(trader: UserModel, tenant: TenantModel) {
    if (confirm('Are you sure to delete the trader: "' + trader.username + '" of tenant: "' + tenant.name + '" ?')) {
      this.rootService.deleteTraderUser(trader).subscribe((deletedTrader) =>
        this.traders = this.traders.filter(f => f.id !== deletedTrader.id));
    }
  }

  onDeleteAdmin(trader: UserModel, tenant: TenantModel) {
    if (confirm('Are you sure to delete the admin: "' + trader.username + '" of tenant: "' + tenant.name + '" ?')) {
      this.rootService.deleteAdminUser(trader).subscribe((deletedAdmin) =>
        this.admins = this.admins.filter(f => f.id !== deletedAdmin.id));
    }
  }

  onDeleteTenant(tenant: TenantModel) {
    if (confirm('Are you sure to delete the tenant: "' + tenant.name + '" ?\n' +
      'All the admin, traders and followers will get deleted!')) {
      this.rootService.deleteTenant(tenant).subscribe((deletedTenant) =>
        this.tenants = this.tenants.filter(f => f.id !== deletedTenant.id));
    }
  }
}
