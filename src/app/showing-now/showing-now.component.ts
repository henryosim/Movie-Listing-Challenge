import { log } from 'util';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showing-now',
  templateUrl: './showing-now.component.html',
  styleUrls: ['./showing-now.component.scss']
})
export class ShowingNowComponent implements OnInit {

  public movies: any;
  public genres: any;
  public ratings: Array<object> = [];
  public imagePath: string;
  constructor(private movieService: MovieService) {
    this.imagePath = this.movieService.imageURL;
  }

  ngOnInit() {

    this.movieService.GetNowPlaying().subscribe(res => {
      this.movies = res['results'];
      this.movies.forEach(movie => {
        this.ratings.push(movie.vote_average);
      });
      console.log(this.movies);
      console.log(this.ratings);
    });

    this.movieService.GetGenres().subscribe(res => {
      this.genres = res['genres'];
      console.log(this.genres);
    });

  }


}
