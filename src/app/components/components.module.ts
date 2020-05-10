import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowEvenComponent } from './slideshow-even/slideshow-even.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



@NgModule({
  entryComponents: [
    MovieDetailComponent
  ],
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowEvenComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowEvenComponent,
    MovieDetailComponent
  ]
})
export class ComponentsModule { }
