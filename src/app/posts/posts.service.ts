import { PostModel } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()  //used if you inject some other service into this service
export class PostsService{
   private posts:PostModel[]=[];
   private postUpdated=new Subject<PostModel[]>();

   constructor(private http:HttpClient){

   }
   getPosts(){
       this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
       .pipe(map((postData)=>{
            return postData.posts.map( post =>{
                return {
                    id:post._id,
                    title:post.title,
                    content:post.content
                }
            })
       }))
       .subscribe((transformedPostsWithId)=>{
            this.posts=transformedPostsWithId;
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

   deletePost(id){
       this.http.delete<{message:string}>('http://localhost:3000/api/posts/'+id)
       .subscribe((responsedata)=>{
            console.log(responsedata);
       })
   }
}