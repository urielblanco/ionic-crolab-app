import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-peliculas',
  templateUrl: 'peliculas.page.html',
  styleUrls: ['peliculas.page.scss']
})
export class PeliculasPage implements OnInit {

  peliculasRecientes: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  };

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getFeature().subscribe(resp => {
      this.peliculasRecientes = resp.results;
      console.log(resp);
    });
  }
}
