import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
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

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
  });

  resetPassword(value){
    this.auth.resetPassword(value)
    .then(res => {
      this.isSubmitted = true;
      this.errorMessage = '';
      this.successMessage = 'We just sent you a reset link to your email';
      setTimeout(()=>{
        this.auth.logout();
        this.router.navigate(['/login']);
      },1000);
    }, err => {
      console.log(err);
      this.isSubmitted = true;
      this.hasError = true;
      this.errorMessage = err;
      this.successMessage = '';
    })
  }
}
