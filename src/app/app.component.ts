import { Component, OnInit } from '@angular/core';
import { PostModel } from './posts/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
 constructor(private authservice:AuthService){}
 
 
  ngOnInit(){
    //check if the token is stored after refershing the page to
    //provide access to authenicated user 
    this.authservice.autoAuthUser();
  }
  title = 'MEAN';

  //app.comonent acted as a parent component for post create and post list and passed data between them using event emitters
  // createdPosts :PostModel[]=[]
  // onPostAdded(post){
  //   this.createdPosts.push(post);
  // }


}
