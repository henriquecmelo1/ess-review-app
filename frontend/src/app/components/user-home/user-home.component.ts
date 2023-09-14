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
  username: string | null = null;
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit() {

  }
  redirectToProfile(event: Event){
    event.preventDefault();
    this.router.navigate(['profile']);
  }
}
