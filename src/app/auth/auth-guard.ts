import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate{

    constructor(private authservice:AuthService,private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot):boolean{ 
         const isAuthorized=this.authservice.getIsAuthenticated();

         if(!isAuthorized){
            this.router.navigate(["/login"]);
         }
         return isAuthorized;
       }

}