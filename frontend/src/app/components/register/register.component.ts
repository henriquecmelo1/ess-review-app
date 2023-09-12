import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  //form: FormBuilder;
  constructor(private router: Router, private formBuilder: FormBuilder){}
  redirectToSignin(event: Event){
    event.preventDefault();
    this.router.navigate(['auth/signin']);
  }
  /*ngOnInit(): void{
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
    })
  }*/
}
