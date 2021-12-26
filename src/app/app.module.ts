import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UnlessDirective} from './_directives/unless.directive';
import {DropdownDirective} from './shared/dropdown.directive';
import {LoginComponent} from './login/login.component';
import {SettingItemDirective} from './_directives/setting-item.directive';
import {AppInComponent} from './app-in/app-in.component';
import {LoginListComponent} from './login-list/login-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserComponent} from './user/user.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './_guards/auth-guard.service';
import {RootGuard} from './_guards/root-guard.service';
import {AdminGuard} from './_guards/admin-guard.service';
import {AuthoritiesToNamesPipe} from './_pipes/authorities-to-names.pipe';
import {AuthInterceptor} from './_interceptors/auth-interceptor';
import {MethodInterceptor} from './_interceptors/method-interceptor';
import {HttpErrorResponseInterceptor} from './_interceptors/http-error-response-interceptor';
import {AdminSettingsComponent} from './settings/admin-settings/admin-settings.component';
import {RootSettingsComponent} from './settings/root-settings/root-settings.component';
import {RootUsersComponent} from './root/users/root-users.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AdminOrRootGuard} from './_guards/admin-or-root-guard.service';
import { ImportsComponent } from './imports/imports.component';
import { ExportsComponent } from './exports/exports.component';
import { EmailsComponent } from './emails/emails.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UnlessDirective,
    DropdownDirective,
    LoginComponent,
    SettingItemDirective,
    AppInComponent,
    UserListComponent,
    LoginListComponent,
    UserComponent,
    PageNotFoundComponent,
    AuthoritiesToNamesPipe,
    AdminSettingsComponent,
    RootSettingsComponent,
    RootUsersComponent,
    ContactsComponent,
    ImportsComponent,
    ExportsComponent,
    EmailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AdminGuard, RootGuard, AdminOrRootGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MethodInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorResponseInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
