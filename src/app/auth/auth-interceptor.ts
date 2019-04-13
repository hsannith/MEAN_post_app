import { HttpInterceptor, HttpRequest,HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


//this file is used to add JWT token to the header and pass the request 
//to backend
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   
   constructor(private authService:AuthService){}
   
   intercept(req :HttpRequest<any>,next:HttpHandler){
        const JWTtoken=this.authService.getJWTtoken();
    
         console.log("in interceptor");
        console.log(JWTtoken);
        //'authorization' is the keyword used in backend
        //to extract JWT from header
        const authRequest=req.clone({
            headers:req.headers.set('authorization',"Bearer "+JWTtoken)
        });
        return next.handle(authRequest);
    }

}