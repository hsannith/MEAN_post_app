import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import {PostModel } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle='';
  postContent='';

  @Output() postCreated=new EventEmitter<PostModel>();

  onAddPost(){
    const post :PostModel={
      title:this.postTitle,
      content:this.postContent
    }
    this.postCreated.emit(post);
  }


  constructor() { }

  ngOnInit() {
  }

}
