import { AddUserComponent } from './../../components/add-user/add-user.component';
import { UserListComponent } from './../../components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
// Services
import { AuthGuardService } from '../../services/auth-guard.service';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'peliculas',
        loadChildren: () => import('../peliculas/peliculas.module').then(m => m.PeliculasPageModule)
      },
      {
        path: 'buscar',
        loadChildren: () => import('../buscar/buscar.module').then(m => m.BuscarPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../favoritos/favoritos.module').then(m => m.FavoritosPageModule)
      },
      {
        path: 'usuarios',
        component: UserListComponent, 
        canActivate: [AuthGuardService]
      },
      {
        path: 'addUser',
        component: AddUserComponent, 
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        loadChildren: () => import('../user/user.module').then(m => m.UserPageModule), 
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        redirectTo: '/tabs/peliculas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/peliculas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
