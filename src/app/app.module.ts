import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UnlessDirective} from './_directives/unless.directive';
import {DropdownDirective} from './shared/dropdown.directive';
import {NewAccountComponent} from './new-account/new-account.component';
import {LoginComponent} from './login/login.component';
import {SettingItemDirective} from './_directives/setting-item.directive';
import {AppInComponent} from './app-in/app-in.component';
import {LoginListComponent} from './login-list/login-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserComponent} from './user/user.component';
import {ChatComponent} from './chat/chat.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth/guards/auth-guard.service';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {RootGuard} from './auth/guards/root-guard.service';
import {AdminGuard} from './auth/guards/admin-guard.service';
import {AuthoritiesToNamesPipe} from './_pipes/authorities-to-names.pipe';
import {AuthInterceptor} from './_interceptors/auth-interceptor';
import {MethodInterceptor} from './_interceptors/method-interceptor';
import {HttpErrorResponseInterceptor} from './_interceptors/http-error-response-interceptor';
import {AdminSettingsComponent} from './settings/admin-settings/admin-settings.component';
import {RootSettingsComponent} from './settings/root-settings/root-settings.component';
import {RootUsersComponent} from './root/users/root-users.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    UnlessDirective,
    DropdownDirective,
    NewAccountComponent,
    LoginComponent,
    SettingItemDirective,
    AppInComponent,
    UserListComponent,
    LoginListComponent,
    UserComponent,
    ChatComponent,
    PageNotFoundComponent,
    SigninComponent,
    SignupComponent,
    AuthoritiesToNamesPipe,
    AdminSettingsComponent,
    RootSettingsComponent,
    RootUsersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AdminGuard, RootGuard,
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
export class AppModule { }
