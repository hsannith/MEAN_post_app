import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';

@Injectable()
export class AuthService{

    private JWTtoken:string;

    constructor(private http:HttpClient){

    }

    getJWTtoken(){
        return this.JWTtoken;
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
        })
    }
}
