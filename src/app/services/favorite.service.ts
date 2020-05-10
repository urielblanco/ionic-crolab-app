import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MovieDetail } from '../interfaces/interfaces';

const { Storage } = Plugins;

@Injectable()
export class FavoriteService {

  // tslint:disable-next-line: variable-name
  private _peliculas: MovieDetail[] = [];

  constructor() {
  }

  loadFavorites() {
    return new Promise(async resolve => {
      const ret = await Storage.get({ key: 'peliculas' });
      const peliculas = JSON.parse(ret.value);

      this._peliculas = peliculas && peliculas;
      resolve();
    });
  }

  getLocalMovies() {
    return this._peliculas;
  }

  async updateLocalMovies() {
    await Storage.set({
      key: 'peliculas',
      value: JSON.stringify(this._peliculas)
    });
  }

  async saveMovie(pelicula: MovieDetail) {
    const movie = this._peliculas.find(m => m.id === pelicula.id);

    if (!movie) {
      this._peliculas.push(pelicula);
      this.updateLocalMovies();
    }

  }

  removeMovie(movieId: string) {
    const movieIndex = this._peliculas.findIndex(m => m.id === +movieId);
    this._peliculas.splice(movieIndex, 1);
    this.updateLocalMovies();
  }

  isFavorite(movieId: string): boolean {
    const movie = this._peliculas.find(m => m.id === +movieId);

    return !!movie;
  }
}
