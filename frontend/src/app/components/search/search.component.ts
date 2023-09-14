import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../../models/search';
import { ContentModel } from '../../models/content';
import { FormControl} from '@angular/forms';
import { AuthService } from '../../services/auth.service'


@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
  })
  export class SearchComponent implements OnInit {
    userSearch = new FormControl();
    contentDto = new ContentModel();

  
    constructor(private router: Router, private authService: AuthService){}
    ngOnInit(): void {
        this.authService.getMovie().subscribe((data)=>{
          this.contentDto = data;
        })
    }

    
    





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