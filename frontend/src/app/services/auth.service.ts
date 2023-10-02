import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import { Register } from "../models/register";
import { ContentModel } from "../models/content";
import { Observable, map } from "rxjs";
import { User } from '../models/userModel'
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from 'rxjs/operators';
import { JwtAuth } from "../../app/models/jwtAuth";
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    registerUrl = "auth/signup";
    loginUrl = "auth/signin";
    usere: User | undefined;
    private jwtHelper = new JwtHelperService;
    constructor(private http: HttpClient){}

    public registerUser(user: Register){
        return this.http.post<any>('http://localhost:3000/auth/signup', user)
    }
    
    public login(loginDto: Login): Observable<JwtAuth> {
        return this.http.post<JwtAuth>('http://localhost:3000/auth/signin', loginDto)
          .pipe(
            tap((response) => {
              const token = response.access_token;
              console.log('Token no auth service:', token)
            })
          );
      }
  
    public editContent(content: ContentModel): Observable<ContentModel>{
        return this.http.patch<ContentModel>('http://localhost:3000/contents', content)
    }
  
    public removeContent(content: ContentModel): Observable<ContentModel>{
        return this.http.delete<ContentModel>('http://localhost:3000/contents')
    }
    
    getUserData(): Observable<User> {
        const token = localStorage.getItem('jwtToken')
        return this.http.get<User>('http://localhost:3000/users/me')
    }

    createContent(content: ContentModel): Observable<ContentModel>{
        return this.http.post<ContentModel>('http://localhost:3000/contents', content);
    }
 
    getMovie(): Observable<ContentModel>{
        return this.http.get<ContentModel>('http://localhost:3000/contents');
    }
    
}
