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
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit() {
    this.authService.getLoggedInUser().subscribe({
      next: (user: User) => {
        this.loggedInUser = user;
        console.log(this.loggedInUser)
      },
      error: (error) => {
        console.error('Erro ao obter os dados do usuário logado:', error);
      },
    });
  }
  redirectToProfile(event: Event){
    event.preventDefault();
    this.router.navigate(['profile']);
  }
}
