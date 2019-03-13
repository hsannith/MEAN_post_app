import { Component } from '@angular/core';
import { PostModel } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN';

  //app.comonent acted as a parent component for post create and post list and passed data between them using event emitters
  // createdPosts :PostModel[]=[]
  // onPostAdded(post){
  //   this.createdPosts.push(post);
  // }


}
