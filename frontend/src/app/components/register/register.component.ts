import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../models/register';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerDto = new Register();

  constructor(private router: Router, private authService: AuthService){}
  
  ngOnInit() {
    
  }
  
  registerUser(){
    this.authService.registerUser(this.registerDto)
    .subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['auth/signin'])
      },
      error: err => console.error(err), 
    });
  }
  
  
  redirectToSignin(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signin']);
  }
 
}
