import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
    
  }
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]
  };
  slides = [
    { img: 'assets/movie_1.jpg' },
    { img: 'assets/movie_2.jpg' },
    { img: 'assets/movie_3.jpg' },
    { img: 'assets/movie_4.jpg' },
    { img: 'assets/movie_5.jpg' },
    { img: 'assets/movie_6.jpg' },
    { img: 'assets/movie_7.jpg' },
    { img: 'assets/movie_8.jpg' },
  ];


}
