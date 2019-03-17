import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import {PostModel } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle='';
  postContent='';

  //sending data using event emitter which is replaced by services later
 // @Output() postCreated=new EventEmitter<PostModel>();

  onAddPost(form:NgForm){

    if(form.invalid){
      console.log(form);
      return;
    }

    const post :PostModel={
      id:null,
      title:form.value.title,
      content:form.value.content
    }
    this.serviceForPosts.addPost(post);
    form.resetForm();
  }


  constructor(public serviceForPosts:PostsService) { }

  ngOnInit() {
  }

}
