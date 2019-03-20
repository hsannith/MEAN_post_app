import { Component, OnInit, Input,OnDestroy } from '@angular/core';

import {PostModel } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  // posts=[
  //   {title:'first post',content:'hituuuu'},
  //   {title:'first post',content:'hituuuu'},
  //   {title:'first post',content:'hituuuu'}
  // ]

  //to get data from parent component using property binding which is replaced by services
  //@Input()  posts:PostModel[]=[];

  posts:PostModel[]=[];
  isLoading=false;
  private subscriptionForPosts:Subscription;

  serviceForPosts:PostsService;

  constructor(serviceForPostsArgument:PostsService) {
    this.serviceForPosts=serviceForPostsArgument;
   }

  


  ngOnInit() {
    this.serviceForPosts.getPosts();
    this.isLoading=true;
    this.subscriptionForPosts=this.serviceForPosts.getPostUpdatedListener()
    .subscribe((postsUpdated:PostModel[])=>{
      this.isLoading=false;
      this.posts=postsUpdated;
    });
  }

  onDelete(id:string){
    this.serviceForPosts.deletePost(id);

   }

  ngOnDestroy(){
    this.subscriptionForPosts.unsubscribe();
  }

}
