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
  public imagePath: string;
  constructor(private movieService: MovieService) {
    this.imagePath = this.movieService.imageURL;
  }

  ngOnInit() {
    // alert(1);

    this.movieService.GetNowPlaying().subscribe(res => {
      this.movies = res['results'];
      console.log(this.movies);
    });
  }


}
