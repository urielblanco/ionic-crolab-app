import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import { Analytics } from 'capacitor-analytics';
const analytics = new Analytics();


@Component({
  selector: 'app-peliculas',
  templateUrl: 'peliculas.page.html',
  styleUrls: ['peliculas.page.scss']
})
export class PeliculasPage implements OnInit {
  user: any = {};
  year: any = '';
  customize: Boolean = false;
  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];
  constructor(private moviesService: MoviesService, private remoteConfig: AngularFireRemoteConfig) {
  }

  ngOnInit() {

    this.remoteConfig.strings.dateFilter.subscribe(resp => {
      console.log('dateFilter', resp);
      if(resp === 'custom'){
        this.customize = true;
        this.moviesService.getFeature().subscribe(resp => {
          this.peliculasRecientes = resp.results;
        });
      }
      else{
        this.year = resp;
        this.customize = false;
        this.moviesService.getFeatureByYear(resp).subscribe(resp => {
          this.peliculasRecientes = resp.results;
        });
      }
    });

    this.getPopularMovies();
  }

  ngAfterContentInit(){
    analytics.logEvent({
      name: 'start_peliculas_page',
      params: {}
    })
    .then(() => console.log(`logEvent SUCCESS: start_peliculas_page`))
    .catch((error) => {console.log(`logEvent ERROR: `, error)})

    analytics.setScreen({
      name: `peliculas_screen`
    })
    .then(() => console.log(`setScreen SUCCESS: peliculas_screen`))
    .catch((error) => {console.log(`setScreen ERROR: `, error)})
  }

  getPopularMovies() {
    this.moviesService.getPopular().subscribe(resp => {
      this.peliculasPopulares.push(...resp.results);
    });
  }

  loadNextMoviePage() {
    this.getPopularMovies();
  }
}
