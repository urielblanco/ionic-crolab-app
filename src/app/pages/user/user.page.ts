import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
user;
userData;
  constructor(private auth: AuthenticationService, private router: Router) {
    this.userData = '';
   }

  async ngOnInit() {
    this.user = await this.auth.getUserLoggedIn();
  }

  ngAfterContentInit(){
    analytics.logEvent({
      name: 'start_profile_page',
      params: {}
    })
    .then(() => console.log(`logEvent SUCCESS: start_profile_page`))
    .catch((error) => {console.log(`logEvent ERROR: `, error)})

    analytics.setScreen({
      name: `profile_screen`
    })
    .then(() => console.log(`setScreen SUCCESS: profile_screen`))
    .catch((error) => {console.log(`setScreen ERROR: `, error)})
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
