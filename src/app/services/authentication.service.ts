import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
// Import Observable
import { Observable } from 'rxjs';

// Import Firebase and AngularFire
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: any = {};
  public authInfo: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    this.authInfo = this.afAuth.authState;
  }
  
  login(loginData: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(loginData.email, loginData.password).then((data) => {
        this.user = {
          'uid':data.user.uid,
          'email':data.user.email,
          'photoURL':data.user.photoURL,
          'displayName':data.user.displayName
        }
        this.setUserLoggedIn(this.user); // set user data from firebase on local storage
        resolve(data);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        reject(`${error.message}`)
        // ...
      });
    });
  }
  
  async logout() {
    await this.clearLocalStorageUser();
    this.afAuth.signOut().then(() => { console.log('logged out') });
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        this.user = res.user;
        this.setUserLoggedIn(this.user);
        resolve(res);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.user = res.user;
        this.setUserLoggedIn(this.user);
        resolve(res);
      }, err => reject(err))
    })
  }
  resetPassword(email: string): Promise<any> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
  
  // Set data on localStorage
  async setUserLoggedIn(user) {
    await Storage.set({
      key: 'user',
      value: JSON.stringify(user)
    });
    console.log('saved on localStorage');
  }

  // get data on localStorage
  async getUserLoggedIn() {
    const ret = await Storage.get({ key: 'user' });
    if (ret.value) {
      return JSON.parse(ret.value);
    }
    else
      return 'no data';
  }

  // Optional: clear localStorage
  async clearLocalStorageUser() {
    await Storage.remove({ key: 'user' });
  }
}
