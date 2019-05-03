import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  private authStatusSub:Subscription
  constructor(public authservice:AuthService) { }
  
  onSignup(form:NgForm){
    if(form.invalid){
      return;
    }
    this.authservice.createUser(form.value.email,form.value.password);
  }
  ngOnInit() {
    this.authStatusSub=this.authservice.getAuthStatusListener().subscribe(
      authStatus=>{
        
      }
    );
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
