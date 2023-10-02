import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { User } from '../../models/userModel';
import { ContentModel } from '../../models/content';
@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent implements OnInit{
  username: string | null = null;
  user: User | undefined;
  contentDto = new ContentModel();
  constructor(private router: Router, private authService: AuthService){}
  ngOnInit() {
    this.authService.getUserData().subscribe({
      next: (user) =>{
        this.username = user.username;
        this.user = user;
      },
      error: (error) =>{
        console.error("Erro ao obter o usuário", error);
      }
    })
  }

  submitContent(){
    console.log(this.contentDto);
    this.authService.createContent(this.contentDto)
    .subscribe({
      next: res => {
        console.log("conteudo", res);
        this.router.navigate(['profile'])
      },
      error: err => console.error(err),
    })
  }
  redirectToProfile(event: Event){
    event.preventDefault();
    this.router.navigate(['profile']);
  }
  
  redirectToHome(event: Event){
    event.preventDefault();
    this.router.navigate(['home', ]);
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
