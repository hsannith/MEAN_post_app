import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  userIsAuthenticated=false;
  private authListenerSubsc:Subscription;
  constructor(private authservice:AuthService) { }

  onLogOut(){
    this.authservice.logout();
  }

  ngOnInit() {
    this.authListenerSubsc=this.authservice.getAuthStatusListener()
    .subscribe(isAuthentiacated=>{
      this.userIsAuthenticated=isAuthentiacated;
    });
  }

  ngOnDestroy(){
    this.authListenerSubsc.unsubscribe();
  }

}
