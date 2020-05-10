import { Component } from '@angular/core';
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

import { Platform } from '@ionic/angular';
import { FavoriteService } from './services/local-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private favoritos: FavoriteService
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

    await this.favoritos.loadLocalMovies();
  }
}
