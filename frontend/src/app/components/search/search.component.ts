import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../../models/search';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
  })
  export class SearchComponent {
    userSearch = new Search();
  
    constructor(private router: Router){}

    redirectToSignup(event: Event){
      event.preventDefault();
      this.router.navigate(['auth/signup']);
    }
    redirectToSignin(event: Event){
      event.preventDefault();
      this.router.navigate(['auth/signin']);
    }

    redirectToSearch(event: Event){
      event.preventDefault();
      this.router.navigate(['search']);
    }
  
  }