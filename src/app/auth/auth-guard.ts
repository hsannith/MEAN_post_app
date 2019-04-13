import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authservice:AuthService,private router:Router){}

    canActivate():boolean{ 
         const isAuthorized=this.authservice.getIsAuthenticated();

         if(!isAuthorized){
            this.router.navigate(["/login"]);
         }
         return isAuthorized;
       }

}