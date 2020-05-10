import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { MovieDetail, ResponseMDB, ResponseActors } from '../interfaces/interfaces';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  popularPage = 0;

  constructor(private http: HttpClient) {
  }

  private runQuery<T>(query: string) {
    query = `${API_URL}${query}&api_key=${API_KEY}&language=es&include_img_lenguage=es`;

    return this.http.get<T>(query);
  }

  private runQueryWithoutParams<T>(query: string) {
    query = `${API_URL}${query}?api_key=${API_KEY}&language=es&include_img_lenguage=es`;

    return this.http.get<T>(query);
  }

  getPopular() {
    this.popularPage++;
    return this.runQuery<ResponseMDB>(`/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`);
  }


  getFeature() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const fromDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-01`;
    const toDate = `${lastDay.getFullYear()}-${('0' + (lastDay.getMonth() + 1)).slice(-2)}-${lastDay.getDate()}`;

    return this.runQuery<ResponseMDB>(`/discover/movie?primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}`);
  }

  getMovieDetail(movieId: string) {
    return this.runQueryWithoutParams<MovieDetail>(`/movie/${movieId}`);
  }

  getMovieActors(movieId: string) {
    return this.runQueryWithoutParams<ResponseActors>(`/movie/${movieId}/credits`);
  }

  searchMovie(text: string, page: number = 1) {
    return this.runQuery(`/search/movie?query=${text}&page=${page}`);
  }

  async getGenres() {
    return new Promise<any[]>(resolve => {
      this.runQueryWithoutParams('/genre/movie/list').subscribe(resp => {
        // tslint:disable-next-line: no-string-literal
        resolve(resp['genres']);
      });
    });
  }
}
