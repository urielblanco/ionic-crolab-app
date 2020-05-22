import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user;
  isSubmitted;
  hasError;
  errorMessage;
  successMessage;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.user = auth.authInfo;
    this.isSubmitted = false;
    this.hasError = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  login(loginData) {
    this.auth.login(loginData)
    .then(res => {
      console.log('login', res);
      this.isSubmitted = true;
      this.errorMessage = '';
      this.successMessage = 'Your account has been created';
      setTimeout(()=>{
        this.router.navigate(['tabs/peliculas']);
      },2000);
    }, err => {
      console.log('error', err);
      this.isSubmitted = true;
      this.hasError = true;
      this.errorMessage = err;
      this.successMessage = '';
    })
  }

  logout() {
    this.auth.logout();
  }

}
