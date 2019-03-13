import { Component } from '@angular/core';
import { PostModel } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN';
  createdPosts :PostModel[]=[]
  onPostAdded(post){
    this.createdPosts.push(post);
  }


}
