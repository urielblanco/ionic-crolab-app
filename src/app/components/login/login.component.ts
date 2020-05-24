import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();


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
  userData;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.user = auth.authInfo;
    this.isSubmitted = false;
    this.hasError = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {}

  ngAfterContentInit(){
    analytics.logEvent({
      name: 'start_login_page',
      params: {}
    })
    .then(() => console.log(`logEvent SUCCESS: start_login_page`))
    .catch((error) => {console.log(`logEvent ERROR: `, error)})

    analytics.setScreen({
      name: `login_screen`
    })
    .then(() => console.log(`setScreen SUCCESS: login_screen`))
    .catch((error) => {console.log(`setScreen ERROR: `, error)})
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  login(loginData) {
    this.auth.login(loginData)
    .then(res => {
      this.isSubmitted = true;
      this.errorMessage = '';
      this.successMessage = 'Your account has been created';
      setTimeout(()=>{
        this.router.navigate(['tabs/peliculas']);
      },1000);
    }, err => {
      console.log('ERROR login', err);
      this.isSubmitted = true;
      this.hasError = true;
      this.errorMessage = err;
      this.successMessage = '';
    })
  }
  
}
