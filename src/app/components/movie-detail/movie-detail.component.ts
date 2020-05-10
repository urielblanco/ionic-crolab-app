import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, MovieDetail } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {

  @Input() movieId: string;

  pelicula: MovieDetail;
  actores: Cast[] = [];
  hide = 150;
  sliderOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private movieService: MoviesService, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.movieService.getMovieDetail(this.movieId).subscribe(resp => {
      console.log(resp);
      this.pelicula = resp;
    });

    this.movieService.getMovieActors(this.movieId).subscribe(resp => {
      this.actores = resp.cast;
    });
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

}
