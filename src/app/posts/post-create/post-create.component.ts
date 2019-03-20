import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import {PostModel } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActionSequence } from 'protractor';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle='';
  postContent='';
  post:PostModel;
  private mode='create';
  private postId:string;
  

  //sending data using event emitter which is replaced by services later
 // @Output() postCreated=new EventEmitter<PostModel>();

  onSavePost(form:NgForm){

    if(form.invalid){
      console.log(form);
      return;
    }

    if(this.mode==='create'){
      const post :PostModel={
        id:null,
        title:form.value.title,
        content:form.value.content
      }
      this.serviceForPosts.addPost(post);
    }
    else{
      const post :PostModel={
        id:this.postId,
        title:form.value.title,
        content:form.value.content
      }
      this.serviceForPosts.updatePost(post);
    }
    
    form.resetForm();
  }


  constructor(public serviceForPosts:PostsService,public currentRoute:ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute.paramMap.subscribe((paramMap:ParamMap)=>{
        if(paramMap.has('postId')){
          this.mode='edit';
          this.postId=paramMap.get('postId');
          this.serviceForPosts.getPost(this.postId)
          .subscribe(postData=>{
            this.post={id:postData._id,title:postData.title,content:postData.content}
          });
          console.log("hitesh");
          console.log(this.post);
        }
        else{
          this.mode='create';
          this.postId=null;
        }

    })
  }

}
