import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './_guards/auth-guard.service';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {AppInComponent} from './app-in/app-in.component';
import {UserListComponent} from './user-list/user-list.component';
import {LoginListComponent} from './login-list/login-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AdminGuard} from './_guards/admin-guard.service';
import {RootSettingsComponent} from './settings/root-settings/root-settings.component';
import {AdminSettingsComponent} from './settings/admin-settings/admin-settings.component';
import {RootGuard} from './_guards/root-guard.service';
import {RootUsersComponent} from './root/users/root-users.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AdminOrRootGuard} from './_guards/admin-or-root-guard.service';
import {ImportsComponent} from './imports/imports.component';
import {ExportsComponent} from './exports/exports.component';
import {EmailsComponent} from './emails/emails.component';
import {EditContactComponent} from './contacts/edit-contact/edit-contact.component';
import {ContactResolverService} from './_resolvers/contact-resolver.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', canActivate: [AuthGuard], component: AppInComponent, children: [
      {
        path: 'settings', children: [
          {path: 'root', canActivate: [RootGuard], component: RootSettingsComponent},
          {path: 'admin', canActivate: [AdminGuard], component: AdminSettingsComponent}]
      },
      {path: 'users', canActivate: [AdminGuard], component: UserListComponent},
      {path: 'contacts', canActivate: [AdminOrRootGuard], component: ContactsComponent},
      {path: 'contacts/:id', canActivate: [AdminOrRootGuard], component: EditContactComponent, resolve: {contact: ContactResolverService} },
      {path: 'imports', canActivate: [AdminOrRootGuard], component: ImportsComponent},
      {path: 'exports', canActivate: [RootGuard], component: ExportsComponent},
      {path: 'emails', canActivate: [AdminOrRootGuard], component: EmailsComponent},
      {
        path: 'root', canActivate: [RootGuard], children: [
          {path: 'tenants', canActivate: [RootGuard], component: RootUsersComponent},
        ]
      },
      {path: 'users/:id', canActivate: [AdminGuard], component: UserComponent},
      {path: 'logins', canActivate: [AdminGuard], component: LoginListComponent},
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
