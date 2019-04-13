import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

    private JWTtoken:string;
    private isAuthenticated=false;
    private tokenTimer:any;
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

        this.http.post<{jwt:string,expiresIn:number}>("http://localhost:3000/api/user/login",authdata).
        subscribe(response=>{

            console.log(response.jwt);
            this.JWTtoken=response.jwt;
            if(this.JWTtoken){
                
                const tokenExpiresInDuration=response.expiresIn;
                
                this.setAuthTimer(tokenExpiresInDuration);
                const now=new Date();
                const expirationDate=new Date(now.getTime()+tokenExpiresInDuration*1000);
               
                this.saveAuthData(this.JWTtoken,expirationDate);
                //console.log(expirationDate);

                this.isAuthenticated=true;
                this.authStatusListener.next(true);
                this.router.navigate(["/"])

            }
        })
    }

    logout(){
        this.JWTtoken=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    autoAuthUser(){
        const authInfo=this.getAuthData();
        if(!authInfo){
            return;
        }
        const now=new Date();
        const expiresIn=authInfo.expirationDate.getTime()-now.getTime();
        console.log("expires in "+expiresIn)
        if(expiresIn>0){
            this.JWTtoken=authInfo.token;
            this.isAuthenticated=true;
            this.setAuthTimer(expiresIn/1000);
            this.authStatusListener.next(true);
        }
    }


    private saveAuthData(token:string,expirationData:Date){
        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expirationData.toISOString());
    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData(){
        const token=localStorage.getItem('token');
        const expirationDate=localStorage.getItem('expiration');
    
        if(!token || !expirationDate){
            return;
        }

        return{
            token:token,
            expirationDate:new Date(expirationDate)
        }
    }

    private setAuthTimer(duration:number){
        this.tokenTimer=setTimeout(()=>{
            this.logout();
        },duration*1000);
    }
}
