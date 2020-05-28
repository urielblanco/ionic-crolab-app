import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { PushNotifications } = Plugins;
const { Storage } = Plugins;
//
// with type support
import { FCM } from "capacitor-fcm";
const fcm = new FCM();
import { Platform } from '@ionic/angular';

const { PushNotification } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private analytics: AngularFireAnalytics,
    private remoteConfig: AngularFireRemoteConfig,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const { StatusBar, SplashScreen } = Plugins;

    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Dark });
    } catch (err) {
      console.log('this is normal in a browser', err);
    }

    this.analytics.logEvent('start_cro_2');

    await this.remoteConfig.booleans.darkTheme.subscribe(resp => {
      console.log('darkTheme', resp);
      this.doc.body.className = resp ? 'dark' : 'light';
    });
   
  //
  // Unsubscribe from a specific topic
  fcm
    .unsubscribeFrom({ topic: "test" })
    .then(() => console.log(`unsubscribed from topic`))
    .catch(err => console.log(err));
   
  //
  // Get FCM token instead the APN one returned by Capacitor
  fcm
    .getToken()
    .then(r => {
      console.log(`Token ${r.token}`)
      Storage.set({ 
        key: 'token',
        value: r.token});
    })
    .catch(err => console.log(err));
   
  //
  // Remove FCM instance
  /*
  fcm
    .deleteInstance()
    .then(() => alert(`Token deleted`))
    .catch(err => console.log(err));
*/
  }
}
