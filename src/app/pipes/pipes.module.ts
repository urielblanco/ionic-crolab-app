import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { EvenPipe } from './even.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    EvenPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    EvenPipe
  ]
})
export class PipesModule { }
