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
   private postUpdated=new Subject<{postsupdated:PostModel[],totalposts:number}>();

   constructor(private http:HttpClient,private router:Router){

   }
   getPosts (postsPerPage:number, currentPage:number){
       const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;
       this.http.get<{message:string,posts:any,totalPosts:number}>('http://localhost:3000/api/posts'+queryParams)
       .pipe(map((postData)=>{
           //returning java script object with posts(with changed id) and totalposts
            return {posts:postData.posts.map( post =>{
                return {
                    id:post._id,
                    title:post.title,
                    content:post.content,
                    imagePath:post.imagePath,
                    creator:post.creator
                }
            }),totalposts:postData.totalPosts}
       }))
       .subscribe((transformedPostsWithId)=>{
          
            this.posts=transformedPostsWithId.posts;
            this.postUpdated.next({postsupdated:[...this.posts],totalposts:transformedPostsWithId.totalposts});
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
         this.router.navigate(["/"]);
    });
    
   }

   deletePost(id:string){
      return this.http.delete<{message:string}>('http://localhost:3000/api/posts/'+id)   
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
           this.router.navigate(["/"]);
       })
   }

   getPost(id:string){
       return this.http.get<{_id:string,title:string,content:string,imagePath:string}>('http://localhost:3000/api/posts/'+id);
   }
}