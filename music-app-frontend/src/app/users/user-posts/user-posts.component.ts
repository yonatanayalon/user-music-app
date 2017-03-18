import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute }            from '@angular/router';

import { Post }                from '../../models/post';
import { DataService }         from '../../services/data.service';

@Component({
  selector: 'user-posts-list',
  templateUrl: './user-posts.component.html',
  styleUrls: [ './user-posts.component.css' ]
})
export class UserPostsComponent implements OnInit, OnDestroy {
  @Input('userId') userId:number;
  
  private sub: any;

  posts: Post[];

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  getPosts(id:number): void {
    this.dataService
        .getUserPosts(id)
        .then(posts => this.posts = posts);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      let userId = +params['id']; // (+) converts string 'id' to a number
      this.getPosts(userId);
       // In a real app: dispatch action to load the details here.
    });    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
