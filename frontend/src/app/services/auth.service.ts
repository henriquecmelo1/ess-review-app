import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import { Register } from "../models/register";
import { Observable, map } from "rxjs";
import { JwtAuth } from "../models/jwtAuth";
import { ContentModel } from "../models/content";
import { User } from '../models/userModel'


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    registerUrl = "auth/signup";
    loginUrl = "auth/signin";
    constructor(private http: HttpClient){}

    public register(user: Register): Observable<JwtAuth>{
        return this.http.post<JwtAuth>('http://localhost:3000/auth/signup', user)
    }
    
    public login(user: Login): Observable<JwtAuth>{
        return this.http.post<JwtAuth>('http://localhost:3000/auth/signin', user)
    }
  
    public editContent(content: ContentModel): Observable<ContentModel>{
        return this.http.patch<ContentModel>('http://localhost:3000/contents', content)

    getUser(): Observable<User> {
        return this.http.get<User>('http://localhost:3000/users/me');
    }
}