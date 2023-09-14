import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login';
import { JwtAuth } from '../../models/jwtAuth';
import { User } from '../../models/userModel';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  loginDto = new Login();
  jwtDto = new JwtAuth();
  constructor(private router: Router, private authService: AuthService){}
  user: User | undefined;
  ngOnInit(): void {
    
  }
  Login(loginDto: Login){
    this.authService.login(loginDto).subscribe({
      next: (jwtDto) =>{
        localStorage.setItem('jwtToken', jwtDto.token);
        this.router.navigate(['home', 1])
      },
      error: (error) =>{
        console.error('Erro ao fazer login', error);
      },
    });
  }
    
  redirectToSignup(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signup']);
  }

}
