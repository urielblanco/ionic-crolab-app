import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MovieDetail } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

const { Storage } = Plugins;


interface GenreGroup {
  name: string;
  peliculas: MovieDetail[];
}

@Injectable()
export class FavoriteService {

  // tslint:disable-next-line: variable-name
  private peliculas: MovieDetail[] = [];
  private genderGroupSubject = new BehaviorSubject<GenreGroup[]>([]);
  private moviesMap: Map<number, { name: string, peliculas: MovieDetail[] }> = new Map();
  private moviesByGenre: GenreGroup[] = [];

  constructor() {
  }

  get genreGroup$() {
    return this.genderGroupSubject.asObservable();
  }

  private createGenreGroup() {

    for (const pelicula of this.peliculas) {
      this.setMoviesMap(pelicula);
    }

    this.updateGenreGroup();
  }

  private setMoviesMap(pelicula: MovieDetail) {
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

  private updateGenreGroup() {
    this.moviesByGenre = [...this.moviesMap.values()];
    this.moviesByGenre.sort((a, b) => b.peliculas.length - a.peliculas.length);

    this.genderGroupSubject.next(this.moviesByGenre);
  }

  private removeFromMoviesMap(pelicula: MovieDetail) {

    for (const genre of pelicula.genres) {

      if (this.moviesMap.has(genre.id)) {
        const currentValue = this.moviesMap.get(genre.id);
        const movieIndex = currentValue.peliculas.findIndex(m => m.id === pelicula.id);

        currentValue.peliculas.splice(movieIndex, 1);

        if (currentValue.peliculas.length === 0) {
          this.moviesMap.delete(genre.id);
        }
      }
    }

    this.updateGenreGroup();
  }

  loadFavorites() {
    return new Promise(async resolve => {
      const ret = await Storage.get({ key: 'peliculas' });
      const peliculas: MovieDetail[] = JSON.parse(ret.value);

      if (peliculas) {
        this.peliculas = peliculas;
        this.createGenreGroup();
      }

      resolve();
    });
  }

  getLocalMovies() {
    return this.peliculas;
  }

  private async updateLocalMovies() {
    await Storage.set({
      key: 'peliculas',
      value: JSON.stringify(this.peliculas)
    });
  }

  saveMovie(pelicula: MovieDetail) {
    const movie = this.peliculas.find(m => m.id === pelicula.id);

    if (!movie) {
      this.peliculas.push(pelicula);
      this.updateLocalMovies();
      this.setMoviesMap(pelicula);
      this.updateGenreGroup();
    }

  }

  removeMovie(movieId: string) {

    const movieIndex = this.peliculas.findIndex(m => m.id === +movieId);

    if (movieIndex > -1) {
      const elementsDeleted = this.peliculas.splice(movieIndex, 1)[0];
      this.updateLocalMovies();
      this.removeFromMoviesMap(elementsDeleted);
    }
  }

  isFavorite(movieId: string): boolean {
    const movie = this.peliculas.find(m => m.id === +movieId);

    return !!movie;
  }


}
