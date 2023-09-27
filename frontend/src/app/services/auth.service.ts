import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import { Register } from "../models/register";
import { ContentModel } from "../models/content";
import { Observable, map } from "rxjs";
import { User } from '../models/userModel'


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    registerUrl = "auth/signup";
    loginUrl = "auth/signin";
    constructor(private http: HttpClient){}

    public registerUser(user: Register){
        return this.http.post<any>('http://localhost:3000/auth/signup', user)
    }
    
    public loginUser(user: Login){
        return this.http.post<any>('http://localhost:3000/auth/signin', user)
    }

    public getLoggedInUser(): Observable<User>{
        return this.http.get<User>('http://localhost:3000/users/me') 
    }
  
    public editContent(content: ContentModel): Observable<ContentModel>{
        return this.http.patch<ContentModel>('http://localhost:3000/contents', content)
    }
  
    public removeContent(content: ContentModel): Observable<ContentModel>{
        return this.http.delete<ContentModel>('http://localhost:3000/contents')
    }

    createContent(content: ContentModel): Observable<ContentModel>{
        return this.http.post<ContentModel>('http://localhost:3000/contents', content);
    }
 
    getMovie(): Observable<ContentModel>{
        return this.http.get<ContentModel>('http://localhost:3000/contents');
    }
    
}
