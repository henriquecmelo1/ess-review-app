import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import { Register } from "../models/register";
import { Observable, map } from "rxjs";
import { JwtAuth } from "../models/jwtAuth";
import { User } from '../models/userModel'
import { Content } from "../models/content";

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
    getUser(): Observable<User> {
        return this.http.get<User>('http://localhost:3000/users/me');
    }
    createContent(content: Content): Observable<Content>{
        return this.http.post<Content>('http://localhost:3000/contents', content);
    }
}   