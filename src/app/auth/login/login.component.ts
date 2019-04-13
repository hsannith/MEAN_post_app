import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(public authservice:AuthService) { }

  ngOnInit() {
  }

  onLogin(form:NgForm){
    if(form.invalid){
      return;
    }
   
    this.authservice.login(form.value.email,form.value.password);
  }
}
