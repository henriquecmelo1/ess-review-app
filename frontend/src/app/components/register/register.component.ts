import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../models/register';
import { JwtAuth } from '../../models/jwtAuth';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerDto = new Register();
  jwtDto = new JwtAuth();

  constructor(private router: Router, private authService: AuthService){}
  redirectToSignin(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signin']);
  }
  Register(registerDto: Register){
    return this.authService.register(registerDto).subscribe({
      next: (response: JwtAuth) =>{
        console.log('Usuário Criado com Sucesso', response);
        this.router.navigate(['auth/signin'])
      },
      error: (error: any)=>{
       console.error('Erro ao criar o usuário', error);
      }
    });
  }
}
