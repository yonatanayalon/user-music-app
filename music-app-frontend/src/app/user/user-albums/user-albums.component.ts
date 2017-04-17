import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute }            from '@angular/router';

import { Album }                from '../../models/album';
import { DataService }         from '../../services/data.service';

@Component({
  selector: 'user-albums-list',
  templateUrl: './user-albums.component.html',
  styleUrls: [ './user-albums.component.less' ]
})
export class UserAlbumsComponent implements OnInit {
  @Input('userId') userId:number;
  @Output('update') change: EventEmitter<Album> = new EventEmitter<Album>();

  public albums: Album[]
  private sub: any;
  private viewModeWide:boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  getAlbums(): void {
    this.dataService
        .getUserAlbums(this.userId)
        .then(albums => this.albums = albums);
  }

  toggleView() {
    this.viewModeWide = !this.viewModeWide;
  } 
  
  removeAlbum(album:Album) {
    this.dataService.updateUserAlbums(this.userId,album, "remove");
  }

  ngOnInit(): void {
      this.getAlbums();
  }

}
