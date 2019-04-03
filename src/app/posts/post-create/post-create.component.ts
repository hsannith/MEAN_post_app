import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import {PostModel } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActionSequence } from 'protractor';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType} from './mime-type.validator'
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle='';
  postContent='';
  post:PostModel;
  isLoading=false;
  form:FormGroup;
  imagePreview:string;
  private mode='create';
  private postId:string;
  

  //sending data using event emitter which is replaced by services later
 // @Output() postCreated=new EventEmitter<PostModel>();

  onSavePost(){

    if(this.form.invalid){
      return;
    }

    this.isLoading=true;
    if(this.mode==='create'){
      const post :PostModel={
        id:null,
        title:this.form.value.title,
        content:this.form.value.content,
        imagePath:null
      }
      this.serviceForPosts.addPost(post,this.form.value.image);
    }
    else{
     
      
      const post :PostModel={
        id:this.postId,
        title:this.form.value.title,
        content:this.form.value.content,
        imagePath:null
      }
     
      this.serviceForPosts.updatePost(post,this.form.value.image);
    }
    
    this.form.reset();
  }

  onImagePicked(event:Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image:file
    })
    this.form.get('image').updateValueAndValidity();
    const reader=new FileReader();

    reader.onload=()=>{
    //  console.log(reader.result as string);
      this.imagePreview=reader.result as string;
    };
   // console.log("1"+reader.readAsDataURL(file));
    reader.readAsDataURL(file);
  }


  constructor(public serviceForPosts:PostsService,public currentRoute:ActivatedRoute) { }

  ngOnInit() {
    this.form=new FormGroup({
      title:new FormControl(null,
        {
          validators:[Validators.required,Validators.minLength(3)]
        }),
      content:new FormControl(null,
        {
          validators:[Validators.required]
        }),
      image:new FormControl(null,
        {
          validators:[Validators.required],
          asyncValidators:[mimeType]
        })
    });
    this.currentRoute.paramMap.subscribe((paramMap:ParamMap)=>{
     
      if(paramMap.has('postId')){
         
          this.mode='edit';
          this.postId=paramMap.get('postId');
          this.isLoading=true;
          this.serviceForPosts.getPost(this.postId)
          .subscribe(postData=>{
            this.isLoading=false;
            this.post={
              id:postData._id,
              title:postData.title,
              content:postData.content,
              imagePath:postData.imagePath
            }
            this.form.setValue({
              title:this.post.title,
              content:this.post.content,
              image:this.post.imagePath
            });
          });
         
          
        }
        else{
          this.mode='create';
          this.postId=null;
        }

    })
  }

}
