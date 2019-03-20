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
    this.http.post<{message:string,createdpostid:string}>('http://localhost:3000/api/posts',post)
    .subscribe((responsedata)=>{
        console.log(responsedata);
        const createdPostId=responsedata.createdpostid;
        post.id=createdPostId;
        this.posts.push(post);
         this.postUpdated.next([...this.posts]);

    });
    
   }

   deletePost(id:string){
       this.http.delete<{message:string}>('http://localhost:3000/api/posts/'+id)
       .subscribe((responsedata)=>{
            console.log(responsedata);
            const updatedPosts=this.posts.filter(post=>post.id!=id);
            this.posts=updatedPosts;
            this.postUpdated.next([...this.posts]);
       })
   }

   updatePost(post:PostModel){
       const postupdt:PostModel={id:post.id,title:post.title,content:post.content};

       this.http.put<{ message:string}>('http://localhost:3000/api/posts/'+post.id,post)
       .subscribe( (response)=>{
           console.log(response);
           const updatedposts=[...this.posts];
           const oldpostindex=updatedposts.findIndex(p=> p.id===postupdt.id);
           updatedposts[oldpostindex]=postupdt;
           this.posts=updatedposts;
           this.postUpdated.next([...this.posts]);

       })
   }

   getPost(id:string){
       return this.http.get<{_id:string,title:string,content:string}>('http://localhost:3000/api/posts/'+id);
   }
}