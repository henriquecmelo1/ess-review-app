import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  loginDto = new Login();
  
  constructor(private router: Router, private authService: AuthService){}
  
  ngOnInit(){
    
  }

  loginUser(){
    this.authService.loginUser(this.loginDto)
    .subscribe({
      next: (res: any) => {
        console.log(res)
        this.router.navigate(['home', res.user.id])
      },
      error: err => console.error(err), 
    });
  }
    
  redirectToSignup(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signup']);
  }

}
