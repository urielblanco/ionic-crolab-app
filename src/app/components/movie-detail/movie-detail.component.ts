import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Cast, MovieDetail } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();

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
    private favoritos: FavoriteService,
    private toasCtrl: ToastController) {}

  async ngOnInit() {

    this.movieService.getMovieDetail(this.movieId).subscribe(resp => {
      this.pelicula = resp;
    });

    this.movieService.getMovieActors(this.movieId).subscribe(resp => {
      this.actores = resp.cast;
    });

    this.favorite = this.favoritos.isFavorite(this.movieId);
  }

  ngAfterContentInit(){
    analytics.logEvent({
      name: 'start_peliculas_detail_page',
      params: {}
    })
    .then(() => console.log(`logEvent SUCCESS: start_peliculas_detail_page`))
    .catch((error) => {console.log(`logEvent ERROR: `, error)})

    analytics.setScreen({
      name: `peliculas_detail_creen`
    })
    .then(() => console.log(`setScreen SUCCESS: peliculas_detail_creen`))
    .catch((error) => {console.log(`setScreen ERROR: `, error)})
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  toggleFavorite() {

    if (this.favorite) {
      this.favoritos.removeMovie(this.movieId);
      this.presentToast('Película eliminada de favoritos')
    } else {
      this.favoritos.saveMovie(this.pelicula);
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
