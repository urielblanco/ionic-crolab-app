import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { BuscarPageRoutingModule } from './buscar-routing.module';
import { BuscarPage } from './buscar.page';
import { MovieDetailComponent } from 'src/app/components/movie-detail/movie-detail.component';

@NgModule({
  entryComponents: [
    MovieDetailComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
    BuscarPageRoutingModule
  ],
  declarations: [BuscarPage]
})
export class BuscarPageModule { }
