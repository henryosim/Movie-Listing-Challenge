import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public imageURL = 'https://image.tmdb.org/t/p/w500';
  private apiKey = '6e88f0133ebcfdbd0f5bb712f38c9756';
  private nowPlayingURL = 'https://api.themoviedb.org/3/movie/now_playing';
  private genresURL = 'https://api.themoviedb.org/3/genre/movie/list';
  private language = 'en-US';
  constructor(private http: HttpClient) { }

  public GetNowPlaying() {
    return this.http.get(this.nowPlayingURL + '?language=en-US&api_key=' + this.apiKey);
  }

  public GetGenres() {
    return this.http.get(this.genresURL + '?language=en-US&api_key=' + this.apiKey);
  }
}
