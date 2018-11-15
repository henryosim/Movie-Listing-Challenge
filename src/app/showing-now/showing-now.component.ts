import { log, isArray } from 'util';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showing-now',
  templateUrl: './showing-now.component.html',
  styleUrls: ['./showing-now.component.scss']
})
export class ShowingNowComponent implements OnInit {

  public movies: object[];
  public genres: object[] = [];
  public rateFilterOptions: number[] = [];
  public defaultRateFilter: number;
  public imagePath: string;

  private loadedMovies: object[];
  private loadedGenre: object[];
  private rateFilterMinVal = 0;
  private rateFilterMaxVal = 10;
  private selectedGenreIDs: number[];


  constructor(private movieService: MovieService) {
    this.imagePath = this.movieService.imageURL;
    this.defaultRateFilter = 3;


    //loads array of movie objects once into loadedMovie object
    this.movieService.GetNowPlaying().subscribe(res => {
      this.loadedMovies = res['results'];
      this.filterMovies();
    });

    //loads array of genre objects once into loadedGenre object
    this.movieService.GetGenres().subscribe(res => {

      this.loadedGenre = res['genres'];
      this.loadedGenre.forEach(genre => {
        const obj = {
          id: genre['id'],
          name: genre['name'],
          selected: true
        };
        this.genres.push(obj);
      });
      this.filterMovies();
    });

    for (let index = this.rateFilterMinVal; index <= this.rateFilterMaxVal; index += 0.5) {
      this.rateFilterOptions.push(index);
    }
  }

  ngOnInit() { }

  filterMovies() {
    this.movies = [];
    this.setselectedGenreIDs();

    this.loadedMovies.forEach(movie => {
      movie['genreNames'] = [];
      movie['genre_ids'].forEach(genreID => {

        if (movie['vote_average'] >= this.defaultRateFilter && this.selectedGenreIDs.indexOf(genreID) >= 0) {
          const genreName = this.getGenreName(genreID);
          movie['genreNames'].push(genreName);
          this.movies.push(movie);

          console.log(this.selectedGenreIDs);
          console.log(genreID);
          // console.log(movie['genreNames']);
        }

      });
    });

    console.log(this.movies);
    console.log(this.defaultRateFilter);
  }

  getGenreName(id: number): string {
    let name = '';
    this.genres.forEach(genre => {
      if (genre['id'] === id) {
        name = genre['name'];
      }
    });
    return name;
  }

  setselectedGenreIDs() {
    this.selectedGenreIDs = [];
    this.genres.forEach(genre => {
      if (genre['selected']) {
        this.selectedGenreIDs.push(genre['id']);
      }
    });
  }
}
