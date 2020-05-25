import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
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
  { path: 'reset', component: ResetPasswordComponent, canActivate: [AuthGuardService] },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuardService] },
  { path: '', canActivate: [AuthGuardService], loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
