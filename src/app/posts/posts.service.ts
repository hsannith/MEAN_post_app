import { PostModel } from './post.model';
import { Subject } from 'rxjs';

export class PostsService{
   private posts:PostModel[]=[];
   private postUpdated=new Subject<PostModel[]>();

   getPosts(){
       return [...this.posts];
   }

   getPostUpdatedListener(){
       return this.postUpdated.asObservable();
   }
   
   addPost(post:PostModel){
  
    this.posts.push(post);
    this.postUpdated.next([...this.posts])
   }
}