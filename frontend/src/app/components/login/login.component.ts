import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login';
import { JwtAuth } from '../../models/jwtAuth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  loginDto = new Login();
  jwtDto = new JwtAuth();
  constructor(private router: Router, private authService: AuthService){}
  
  ngOnInit(): void {
    
  }
  Login(loginDto: Login){
    this.authService.login(loginDto).subscribe((jwtDto)=>{
      localStorage.setItem('jwtToken', this.jwtDto.token);
    });
  }
  redirectToSignup(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signup']);
  }

}
