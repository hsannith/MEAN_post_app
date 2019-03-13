import { Component, OnInit, Input } from '@angular/core';

import {PostModel } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // posts=[
  //   {title:'first post',content:'hituuuu'},
  //   {title:'first post',content:'hituuuu'},
  //   {title:'first post',content:'hituuuu'}
  // ]

  @Input()  posts:PostModel[]=[];

 
  constructor() { }

  ngOnInit() {
  }

}
