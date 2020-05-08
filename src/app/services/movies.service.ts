import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { RespuestaMDB } from '../interfaces/interfaces';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {
  }

  private runQuery<T>(query: string) {
    query = `${API_URL}${query}&api_key=${API_KEY}&language=es&include_img_lenguage=es`;

    return this.http.get<T>(query);
  }


  getFeature() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const fromDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-01`;
    const toDate = `${lastDay.getFullYear()}-${('0' + (lastDay.getMonth() + 1)).slice(-2)}-${lastDay.getDate()}`;

    // tslint:disable-next-line: max-line-length
    return this.runQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}`);
  }
}
