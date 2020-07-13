import { FirebaseService } from './../../services/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();

import { Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;
const { Storage } = Plugins;
const { BiometricAuth } = Plugins;


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
  available :any = {};
  touchIdOption: any = {};
  touchIdAvailable: boolean = false;

  constructor(private auth: AuthenticationService, 
    private router: Router, 
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController) {
    this.user = auth.authInfo;
    this.isSubmitted = false;
    this.hasError = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  async ngOnInit() {}

  async ngAfterContentInit(){
    this.available = BiometricAuth ? await BiometricAuth.isAvailable() : false;
    this.touchIdOption = await Storage.get({key: 'touchIdOption'});
    console.log('this.touchIdOption.value', this.touchIdOption.value);
    this.touchIdAvailable = this.available;
    analytics.logEvent({
      name: 'start_login_page',
      params: {}
    })
    .then(() => console.log('logEvent SUCCESS: start_login_page'))
    .catch((error) => {console.log('logEvent ERROR:' , error)})

    analytics.setScreen({
      name: 'login_screen'
    })
    .then(() => console.log('setScreen SUCCESS: login_screen'))
    .catch((error) => {console.log('setScreen ERROR: ', error)})
  }

  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  async login(loginData) {
    let vm = this;
    let token = '';
    this.auth.login(loginData)
    .then(async function(res){
      /**
       * Reset campos
       */
      vm.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      });
      vm.hasError = false;
      vm.errorMessage = '';
      /**
       * Habilitamos TouchID si el usuario quiere
       */

     try{
       console.log('vm.touchIdOption.value', vm.touchIdOption.value);
      if (vm.available.has && vm.touchIdOption.value == null) {
        vm.verifyTouchAuth(loginData);
      }
     }
     catch(error){console.log('error login', error);}

      const ret = await Storage.get({ key: 'token' });
      if (ret.value) {
        token = ret.value;
      }
      try{
        /**
         * Guardamos el token del usuario para sus notificaciones push;
         */
        vm.firebaseService.updateToken(res.user.uid, token);
      }
      catch(error){
        console.log('ERROR firebaseService.updateToken', error);
      }
      Storage.remove({ key: 'token' });

      setTimeout(()=>{
        vm.router.navigate(['tabs/peliculas']);
      },1000);
    }, err => {
      console.log('ERROR login', err);
      this.isSubmitted = true;
      this.hasError = true;
      this.errorMessage = err;
      this.successMessage = '';
    })
  }

  async touchIdLogin(){
    if (this.available.has && this.touchIdOption.value == true) {
      const loginData = Storage.get({key: 'userData'});
      console.log('loginData', loginData);
      //this.login();
    }
    const authResult = await BiometricAuth.verify({message: 'Usa tu TouchID para acceder a la aplicación'});
      if (authResult.verified) {
        // success authentication
        const userData = await Storage.get({key: 'userData'});
        const data = JSON.parse(userData.value);
        return this.login(data);
      } else {
        // fail authentication
        return false;
      }
  }

  async verifyTouchAuth(loginData){
    let alert = await this.alertCtrl.create({
      message: '¿Desea usar el TouchID para acceder a la aplicación?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            return false;
          },
        },
        {
          text: 'SI',
          handler: async(data) => {
            const result = await this.validateTouchId(loginData);
            await Storage.get({
              key: 'userData'
            });
            await Storage.get({
              key: 'touchIdOption'
            });
            return result;
          },
        },
      ],
    })
    await alert.present();
  }

  async validateTouchId(loginData): Promise<boolean>{
      const authResult = await BiometricAuth.verify({message: 'Usa tu TouchID para acceder a la aplicación'});
      if (authResult.verified) {
        // success authentication
        await Storage.set({
          key: 'userData',
          value: JSON.stringify(loginData)
        });
        await  Storage.set({
          key: 'touchIdOption',
          value: 'true'
        });
        const data = await Storage.get({key: 'userData'});
        if(data){
          return true;
        }
      } else {
        // fail authentication
        return false;
      }
    }

  /*
  getFCMToken(){
    PushNotifications.register()
    .then(() => {
      //
      // Get FCM token instead the APN one returned by Capacitor
      fcm
      .getToken()
      .then(r => {
        alert(`Token data ${r.token}`);
      })
      .catch(err => console.log(err));
    })
    .catch(err => alert(JSON.stringify(err)));
  }
  */
  
}
