import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactModel} from '../_models/contact.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  loginForm: FormGroup;
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'loginData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required),
      })
    });
  }

  onLogIn() {
    const loginData = this.loginForm.get('loginData').value;
    this.authService.getAndSetAccessToken(loginData).subscribe(
      (token) => {
        this.loginForm.get('loginData').get('username').reset();
        this.loginForm.get('loginData').get('password').reset();
        this.authService.authenticate(token).subscribe(
          () => {
            if (this.authService.isAdmin()) {
              this.router.navigate(['/contacts']);
            } else if (this.authService.isRoot()) {
              this.router.navigate(['/contacts']);
            }
          },
          error => {
            this.isLoading = false;
            this.errorMessage = 'error';
            setTimeout(() => this.errorMessage = null, 2500);
          }
        );
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Wrong username or password.';
        setTimeout(() => this.errorMessage = null, 2500);
      }
    );
  }
}

