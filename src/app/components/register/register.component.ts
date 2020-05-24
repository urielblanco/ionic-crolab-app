import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user;
  isSubmitted;
  hasError;
  errorMessage;
  successMessage;

  constructor(private auth: AuthenticationService, private router: Router, private analytics: AnalyticsService) { 
    this.user = auth.authInfo;
    this.isSubmitted = false;
    this.hasError = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {}

  ngAfterContentInit(){
    analytics.logEvent({
      name: 'start_register_page',
      params: {}
    })
    .then(() => console.log(`logEvent SUCCESS: start_register_page`))
    .catch((error) => {console.log(`logEvent ERROR: `, error)})

    analytics.setScreen({
      name: `register_screen`
    })
    .then(() => console.log(`setScreen SUCCESS: register_screen`))
    .catch((error) => {console.log(`setScreen ERROR: `, error)})
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  register(value){
    this.auth.doRegister(value)
    .then(res => {
      this.isSubmitted = true;
      this.errorMessage = '';
      this.successMessage = 'Your account has been created';
      setTimeout(()=>{
        this.router.navigate(['/tabs']);
      },2000);
    }, err => {
      console.log(err);
      this.isSubmitted = true;
      this.hasError = true;
      this.errorMessage = err;
      this.successMessage = '';
    })
  }
}
