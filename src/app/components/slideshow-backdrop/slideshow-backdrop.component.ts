import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }


  ngOnInit() { }

  async showMovieDetail(movieId: string) {
    const modal =  await this.modalCtrl.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId
      }
    });

    modal.present();
  }
}
