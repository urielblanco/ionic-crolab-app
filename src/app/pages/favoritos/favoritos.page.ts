import { Component, OnInit } from '@angular/core';
import { MovieDetail } from 'src/app/interfaces/interfaces';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss']
})
export class FavoritosPage implements OnInit {

  genreGroup$: Observable<any[]>;

  moviesByGenre: { name: string, peliculas: MovieDetail[] }[] = [];
  moviesMap: Map<number, { name: string, peliculas: MovieDetail[] }> = new Map();

  constructor(private favoritos: FavoriteService) {
  }

  async ngOnInit() {
    this.genreGroup$ = this.favoritos.genreGroup$;
  }
}
