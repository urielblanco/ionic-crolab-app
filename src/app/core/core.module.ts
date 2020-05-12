import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireRemoteConfigModule, DEFAULTS, SETTINGS } from '@angular/fire/remote-config';
import { environment } from '@environment';

import { FavoriteService } from '../services/favorite.service';
import { initApp } from './appConfig';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireRemoteConfigModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAnalyticsModule,
    AngularFireRemoteConfigModule
  ],
  providers: [
    FavoriteService,
    { provide: DEFAULTS, useValue: { darkTheme: false } },
    {
      provide: SETTINGS,
      useFactory: () => ({ minimumFetchIntervalMillis: 10000 })
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [FavoriteService]
    }
  ]
})
export class CoreModule { }
