import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-slideshow-even',
  templateUrl: './slideshow-even.component.html',
  styleUrls: ['./slideshow-even.component.scss'],
})
export class SlideshowEvenComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() plus = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true,
    spaceBetween: -10
  };


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onButtonPlus() {
    this.plus.emit();
  }

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
