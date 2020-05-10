import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';

import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async showMovieDetail(movieId: string) {
    const modal = await this.modalCtrl.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId
      }
    });

    modal.present();
  }

}
