import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import MovieModel from '../../../models/movie-model';
import TheaterModel from '../../../models/theater-model';
import { DataService } from '../../../services/data.service';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

    public theaters: TheaterModel[];
    public movies: MovieModel[];

    public constructor(private dataService: DataService, private router: Router) { } // DI

    public async ngOnInit(): Promise<void> {
        try {
            this.theaters = await this.dataService.getAllTheater();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async showMovies(args: Event) {
        try {
            const select = args.target as HTMLSelectElement; 
            const theaterId = +select.value;
            this.movies = await this.dataService.getMovieByTheater(theaterId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }
    
  public async deleteMovie(movieId: number) {
    try {
      await this.dataService.delete(movieId)
      alert("Movie has been deleted.")
      this.router.navigateByUrl("/home")
    } catch (err: any) {
      alert(err.message)
    }
  }

}
