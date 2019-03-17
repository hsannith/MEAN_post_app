import { PostModel } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()  //used if you inject some other service into this service
export class PostsService{
   private posts:PostModel[]=[];
   private postUpdated=new Subject<PostModel[]>();

   constructor(private http:HttpClient){

   }
   getPosts(){
       this.http.get<{message:string,posts:PostModel[]}>('http://localhost:3000/api/posts')
       .subscribe((postData)=>{
            this.posts=postData.posts;
            this.postUpdated.next([...this.posts]);
       });
       //return [...this.posts];
   }

   getPostUpdatedListener(){
       return this.postUpdated.asObservable();
   }

   addPost(post:PostModel){
    this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
    .subscribe((responsedata)=>{
        console.log(responsedata);
        this.posts.push(post);
         this.postUpdated.next([...this.posts]);
    });
    
   }
}