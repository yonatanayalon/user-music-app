import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }            from '@angular/router';

import { User }                from '../models/user';
import { Album }                from '../models/album';

import { DataService }         from '../services/data.service';


@Component({
  selector: 'users',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.css' ]
})
export class UserComponent implements OnInit, OnDestroy {
  private sub: any;

  user: User;

  selectedTab: string = 'showPostsTab';

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  toggleView() {
    alert("toggle");
  }

  updateAlbumSelection(album:Album, action:string) {
    this.dataService.updateUserAlbums(this.user.id,album, action);
  }

  getUser(id:number): void {
    this.dataService
        .getUser(id)
        .then(user => this.user = user);
  }

  toggleActiveTab(name:string):void {
    this.selectedTab = name;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      let userId = +params['id']; // (+) converts string 'id' to a number
      this.getUser(userId);
    });    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
