import { Component, OnInit } from '@angular/core';
import { MovieDetail } from 'src/app/interfaces/interfaces';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Observable } from 'rxjs';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();

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

  ngAfterContentInit(){
    analytics.logEvent({
      name: 'start_favorite_page',
      params: {}
    })
    .then(() => console.log(`logEvent SUCCESS: start_favorite_page`))
    .catch((error) => {console.log(`logEvent ERROR: `, error)})

    analytics.setScreen({
      name: `favorite_screen`
    })
    .then(() => console.log(`setScreen SUCCESS: favorite_screen`))
    .catch((error) => {console.log(`setScreen ERROR: `, error)})
  }
}
