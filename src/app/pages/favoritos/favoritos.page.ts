import { Component, OnInit } from '@angular/core';
import { MovieDetail } from 'src/app/interfaces/interfaces';
import { FavoriteService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss']
})
export class FavoritosPage implements OnInit {

  peliculas: MovieDetail[] = [];

  moviesByGenre: { name: string, peliculas: MovieDetail[] }[] = [];
  moviesMap: Map<number, { name: string, peliculas: MovieDetail[] }> = new Map();

  constructor(private favoritos: FavoriteService) {
  }

  async ngOnInit() {
    this.peliculas = this.favoritos.getLocalMovies();
    this.createArrayGenre();
  }

  createArrayGenre() {

    for (const pelicula of this.peliculas) {
      for (const genre of pelicula.genres) {
        if (this.moviesMap.has(genre.id)) {
          const currentValue = this.moviesMap.get(genre.id);
          currentValue.peliculas.push(pelicula);

          this.moviesMap.set(genre.id, currentValue);
        } else {
          this.moviesMap.set(genre.id, { name: genre.name, peliculas: [pelicula] });
        }
      }
    }

    this.moviesByGenre = [...this.moviesMap.values()];

    this.moviesByGenre.sort((a, b) => b.peliculas.length - a.peliculas.length);
  }

  onRemoveFavorite(event: { favorite: boolean, movieId: string, genres: any[] }) {
    for (const genre of event.genres) {
      const group = this.moviesByGenre.find(g => g.name === genre.name);

      if (group) {
        const movieIndex = group.peliculas.findIndex(m => m.id === +event.movieId);
        group.peliculas.splice(movieIndex, 1);
      }
    }
  }
}
