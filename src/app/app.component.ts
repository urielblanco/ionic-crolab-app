import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';

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

  }
}
