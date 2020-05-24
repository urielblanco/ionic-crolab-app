import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private user: any = {};
  constructor(private auth: AuthenticationService) { }

  instance() {
    analytics.instance()
    .then(r => console.log(`instance SUCCESS`, r.id))
    .catch((error) => {console.log(`instance ERROR: `, error)})
  }

  reset() {
    analytics.reset()
    .then(() => console.log(`reset SUCCESS`))
    .catch((error) => {console.log(`reset ERROR: `, error)})
  }

  setScreen(screen_name) {
    analytics
      .setScreen({
        name: screen_name
      })
      .then(() => console.log(`setScreen SUCCESS`))
      .catch((error) => {console.log(`setScreen ERROR: `, error)})
  }

  setUserID() {
    this.user = this.auth.getUserLoggedIn();
    analytics
      .setUserID({
        value: this.user.uid
      })
      .then(() => console.log(`setUserID SUCCESS`))
      .catch((error) => {console.log(`setUserID ERROR: `, error)})
  }

  logEvent(event_name, params) {
    analytics
      .logEvent({ name: event_name, params: params })
      .then(() => console.log(`logEvent SUCCESS`, event_name))
      .catch((error) => {console.log(`logEvent ERROR: `, error)})
  }
}
