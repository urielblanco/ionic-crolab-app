import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
// Services
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'home', pathMatch: 'full', redirectTo: 'tabs/peliculas' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent  },
  /*
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
  */
  { path: 'user', component: UserComponent, canActivate: [AuthGuardService]},
  { path: '', canActivate: [AuthGuardService], loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
