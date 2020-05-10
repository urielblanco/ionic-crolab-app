import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Cast, MovieDetail } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {

  @Input() movieId: string;

  pelicula: MovieDetail;
  actores: Cast[] = [];
  favorite = false;
  hide = 150;

  sliderOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private movieService: MoviesService,
    private modalCtrl: ModalController,
    private localDataService: LocalDataService,
    private toasCtrl: ToastController) { }

  async ngOnInit() {

    this.movieService.getMovieDetail(this.movieId).subscribe(resp => {
      this.pelicula = resp;
    });

    this.movieService.getMovieActors(this.movieId).subscribe(resp => {
      this.actores = resp.cast;
    });

    this.favorite = this.localDataService.isFavorite(this.movieId);
  }

  goBack() {
    this.modalCtrl.dismiss({ favorite: this.favorite, movieId: this.movieId, genres: this.pelicula.genres });
  }

  toggleFavorite() {

    if (this.favorite) {
      this.localDataService.removeMovie(this.movieId);
      this.presentToast('Película eliminada de favoritos')
    } else {
      this.localDataService.saveMovie(this.pelicula);
      this.presentToast('Película añadida a favoritos');
    }

    this.favorite = !this.favorite;
  }

  async presentToast(message: string) {
    const toast = await this.toasCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
