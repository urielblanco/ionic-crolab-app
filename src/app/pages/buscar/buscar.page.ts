import { Component, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { MovieDetailComponent } from 'src/app/components/movie-detail/movie-detail.component';

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss']
})
export class BuscarPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  searchText = '';
  peliculas: Pelicula[] = [];
  searchPage = 0;
  searching = false;

  constructor(private movieService: MoviesService, private modalCtrl: ModalController) { }

  onSearchChange(event) {
    const text: string = event.detail.value;

    if (text.trim().length === 0 || text.trim() === this.searchText) {
      this.searching = false;
      this.searchText = '';
      return;
    }

    this.peliculas = [];
    this.searching = true;
    this.searchPage = 1;
    this.getMoviesByText(text);
  }

  getMoviesByText(text: string, event?: any) {
    this.movieService.searchMovie(text, this.searchPage).subscribe(resp => {

      if (event) {
        event.target.complete();
      }
      // tslint:disable-next-line: no-string-literal
      this.peliculas.push(...resp['results']);
      this.searching = false;
      this.searchText = text;
      // tslint:disable-next-line: no-string-literal
      this.infiniteScroll.disabled = resp['results'].length === 0;
    });
  }

  loadMovies(event) {
    this.searchPage++;
    this.getMoviesByText(this.searchText, event);
  }

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
