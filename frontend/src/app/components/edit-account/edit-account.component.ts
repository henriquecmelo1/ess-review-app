import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Register } from '../../models/register';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  editDto = new Register();
  constructor(private router: Router, private userService: UserService){}

  editUser(){
    this.userService.editUser(this.editDto).subscribe({
      next: res =>{
        console.log("EDITADO COM SUCESSO")
        this.router.navigate(['profile'])
      },
      error: err => console.error(err),
    });
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
  redirectToMovies(event: Event){
    event.preventDefault();
    this.router.navigate(['movies']);
  }
  logout() {
    localStorage.removeItem('jwtToken');

    this.router.navigate(['home']);
  }
}
