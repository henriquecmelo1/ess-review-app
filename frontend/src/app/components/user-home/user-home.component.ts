import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/userModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit{
  loggedInUser: User | null = null;
  username: string | null = null;
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit() {
    this.authService.getUserData().subscribe({
      next: (user) =>{
        this.username = user.username;
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
