import { Component } from '@angular/core';
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform
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

  }
}
