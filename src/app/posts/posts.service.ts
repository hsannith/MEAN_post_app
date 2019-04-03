import { PostModel } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { type } from 'os';

@Injectable()  //used if you inject some other service into this service
export class PostsService{
   private posts:PostModel[]=[];
   private postUpdated=new Subject<PostModel[]>();

   constructor(private http:HttpClient,private router:Router){

   }
   getPosts(){
       this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
       .pipe(map((postData)=>{
            return postData.posts.map( post =>{
                return {
                    id:post._id,
                    title:post.title,
                    content:post.content,
                    imagePath:post.imagePath
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

   addPost(post:PostModel,image:File){
       const PostData=new FormData();
       PostData.append("title",post.title);
       PostData.append("content",post.content);
       PostData.append("image",image,post.title);

    this.http.post<{message:string,post:PostModel}>('http://localhost:3000/api/posts',PostData)
    .subscribe((responsedata)=>{
        console.log(responsedata);
        const createdPostId=responsedata.post.id;
        post.id=createdPostId;
        post.imagePath=responsedata.post.imagePath;
        this.posts.push(post);
         this.postUpdated.next([...this.posts]);
         this.router.navigate(["/"]);
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

   updatePost(post:PostModel,image:File | string){
    let PostData : PostModel | FormData;  

    if(typeof(image)==='object'){
            PostData=new FormData();
            PostData.append("id",post.id);
            PostData.append("title",post.title);
            PostData.append("content",post.content);
            PostData.append("image",image,post.title);
        }
        else{
            PostData={
                id:post.id,
                title:post.title,
                content:post.content,
                imagePath:image
            }

        }
       this.http.put<{ message:string,imagePath:string}>('http://localhost:3000/api/posts/'+post.id,PostData)
       .subscribe( (response)=>{
          // console.log(response);
           const updatedposts=[...this.posts];
           const oldpostindex=updatedposts.findIndex(p=> p.id===post.id);
           const postupdt:PostModel={
               id:post.id,
               title:post.title,
               content:post.content,
               imagePath:response.imagePath
           }
           updatedposts[oldpostindex]=postupdt;
           this.posts=updatedposts;
           this.postUpdated.next([...this.posts]);
           this.router.navigate(["/"]);
       })
   }

   getPost(id:string){
       return this.http.get<{_id:string,title:string,content:string,imagePath:string}>('http://localhost:3000/api/posts/'+id);
   }
}