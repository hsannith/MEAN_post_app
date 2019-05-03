import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authStatusSub:Subscription;
  constructor(public authservice:AuthService) { }

  ngOnInit() {
    this.authStatusSub=this.authservice.getAuthStatusListener().subscribe(
      authStatus=>{
        
      }
    );
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

  onLogin(form:NgForm){
    if(form.invalid){
      return;
    }
   
    this.authservice.login(form.value.email,form.value.password);
  }
}
