import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuscarPage } from './buscar.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { BuscarPageRoutingModule } from './buscar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BuscarPageRoutingModule
  ],
  declarations: [BuscarPage]
})
export class Tab2PageModule {}
