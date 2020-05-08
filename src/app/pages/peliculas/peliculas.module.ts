import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { PeliculasPageRoutingModule } from './peliculas-routing.module';
import { PeliculasPage } from './peliculas.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
    PeliculasPageRoutingModule,
  ],
  declarations: [PeliculasPage]
})
export class PeliculasPageModule {}
