import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

    private JWTtoken:string;
    private isAuthenticated=false;
    private authStatusListener=new Subject<boolean>();

    constructor(private http:HttpClient,private router:Router){

    }

    getIsAuthenticated(){
        return this.isAuthenticated;
    }
    getJWTtoken(){
        return this.JWTtoken;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(email:string,password:string){
        const authdata:AuthData={
            email:email,
            password:password
        }
        console.log(authdata);
        console.log("in sgnup");
        this.http.post("http://localhost:3000/api/user/signup",authdata).
        subscribe(response=>{
            console.log(response);
        })
        
    }

    login(email:string,password:string){
        const authdata:AuthData={
            email:email,
            password:password
        }

        this.http.post<{jwt:string}>("http://localhost:3000/api/user/login",authdata).
        subscribe(response=>{

            console.log(response.jwt);
            this.JWTtoken=response.jwt;
            if(this.JWTtoken){
                this.isAuthenticated=true;
                this.authStatusListener.next(true);
            }
        })
    }

    logout(){
        this.JWTtoken=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        this.router.navigate(["/"])
    }
}
