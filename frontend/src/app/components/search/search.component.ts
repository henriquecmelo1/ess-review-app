import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
  })
  export class Search {
    
  
    constructor(){}
    redirectToSignin(event: Event){
      event.preventDefault();
      //this.router.navigate(['auth/signin']);
    }
    // Register(registerDto: Register){
    //   return this.authService.register(registerDto).subscribe((response) =>{
    //     console.log('Usuário Criado com Sucesso', response);
    //     this.router.navigate([''])
    //   },
    //   (error)=>{
    //     console.error('Erro ao criar o usuário', error);
    //   }
    //   );
    // }
  }