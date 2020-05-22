import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
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

  constructor(private auth: AuthenticationService, private router: Router) { 
    this.user = auth.authInfo;
    this.isSubmitted = false;
    this.hasError = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit() {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  register(value){
    this.auth.doRegister(value)
    .then(res => {
      console.log(res);
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
