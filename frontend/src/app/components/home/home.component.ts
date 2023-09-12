import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  }
  slides = [
    { img: 'assets/movie_1.jpg' },
    { img: 'assets/movie_2.jpg' },
    { img: 'assets/movie_3.jpg' },
    { img: 'assets/movie_4.jpg' },
    { img: 'assets/movie_5.jpg' },
    { img: 'assets/movie_6.jpg' },
    { img: 'assets/movie_7.jpg' },
  ]
  constructor(private router: Router){}
  redirectToSignup(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signup']);
  }
  redirectToSignin(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signin']);
  }
}
