import { Component, OnInit, Input,OnDestroy } from '@angular/core';

import {PostModel } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
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
  totalPosts=0;
  postsPerPage=2;
  currentPage=1
  pageSizeOptions=[1,2,5,10];

  private subscriptionForPosts:Subscription;

  serviceForPosts:PostsService;

  constructor(serviceForPostsArgument:PostsService) {
    this.serviceForPosts=serviceForPostsArgument;
   }

  


  ngOnInit() {
    this.serviceForPosts.getPosts(this.postsPerPage,this.currentPage);
    this.isLoading=true;
    this.subscriptionForPosts=this.serviceForPosts.getPostUpdatedListener()
    .subscribe((postData:{postsupdated:PostModel[],totalposts:number})=>{
      this.isLoading=false;
      this.posts=postData.postsupdated;
      this.totalPosts=postData.totalposts;
    });
  }

  onDelete(id:string){
    this.isLoading=true;
    this.serviceForPosts.deletePost(id).subscribe(()=>{
      this.serviceForPosts.getPosts(this.postsPerPage,this.currentPage);
    })

   }

   onChangedPage(pageData:PageEvent){
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.serviceForPosts.getPosts(this.postsPerPage,this.currentPage)
   }

  ngOnDestroy(){
    this.subscriptionForPosts.unsubscribe();
  }

}
