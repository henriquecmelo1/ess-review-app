import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/userModel';
import { Router } from '@angular/router';
import { ContentModel } from '../../models/content';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  loggedInUser: User | null = null;
  title: string | null = null;
  movie: ContentModel | undefined;
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit() {
    this.authService.getMovie()
    .subscribe({
      next: (movie) => {
        this.title = movie.title
        console.log(this.movie?.title)
      },
      error: (error) =>{
        console.error("Erro ao obter o usuário", error);
      }
    })
  }
  redirectToProfile(event: Event){
    event.preventDefault();
    this.router.navigate(['profile']);
  }
  
  redirectToHome(event: Event){
    event.preventDefault();
    this.router.navigate(['/']);
  }

  redirectToFilms(event: Event){
    event.preventDefault();
    this.router.navigate(['profile']);
  }
  logout() {
    localStorage.removeItem('jwtToken');
  
    this.router.navigate(['home']);
  }
}
