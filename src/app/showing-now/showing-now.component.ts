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

  private loadedMovies: object[] = [];
  private loadedGenre: object[];
  private rateFilterMinVal = 0;
  private rateFilterMaxVal = 10;
  private selectedGenreIDs: number[];


  constructor(private movieService: MovieService) {
    this.imagePath = this.movieService.imageURL;
    this.defaultRateFilter = 3;

    /** loads array of movie objects once into loadedMovie object */
    this.movieService.GetNowPlaying().subscribe(res => {
      this.loadedMovies = res['results'];
      this.filterMovies();
    });

    /** loads array of genre objects once into loadedGenre object */
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

    // create array of rating values from 0-10 with increment of 0.5
    for (let index = this.rateFilterMinVal; index <= this.rateFilterMaxVal; index += 0.5) {
      this.rateFilterOptions.push(index);
    }

  }

  ngOnInit() { }

  /**
   * Filters the movie results
   */
  filterMovies() {
    this.movies = [];
    this.setselectedGenreIDs();

    this.loadedMovies.forEach(movie => {
      let tracker = false;
      movie['genreNames'] = [];
      movie['genre_ids'].forEach(genreID => {

        if (this.selectedGenreIDs.indexOf(genreID) >= 0) {
          const genreName = this.getGenreName(genreID);
          movie['genreNames'].push(genreName);
          tracker = true;
        }
      });

      if (movie['vote_average'] >= this.defaultRateFilter && tracker) {
        this.movies.push(movie); // adds movies to the Movie array.
      }
      tracker = false;

    });


    this.movies.sort(this.compare); // sort movies that will be displayed
  }

  /** sorting function,  to sort movies by popularity */
  compare(b, a) {
    if (a.popularity < b.popularity) {
      return -1;
    }
    if (a.popularity > b.popularity) {
      return 1;
      return 0;
    }
  }

  /** takes in genre id and outputs the genre name */
  getGenreName(id: number): string {
    let name = '';
    this.genres.forEach(genre => {
      if (genre['id'] === id) {
        name = genre['name'];
      }
    });
    return name;
  }

  /** iterates through all genres and retrieves all selected genre filters */
  setselectedGenreIDs() {
    this.selectedGenreIDs = [];
    this.genres.forEach(genre => {
      if (genre['selected']) {
        this.selectedGenreIDs.push(genre['id']);
      }
    });
  }
}
