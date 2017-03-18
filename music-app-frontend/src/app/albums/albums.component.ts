import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Album }                from '../models/album';
import { User }                from '../models/user';
import { DataService }         from '../services/data.service';

@Component({
  selector: 'albums-list',
  templateUrl: './albums.component.html',
  styleUrls: [ './albums.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AlbumsComponent implements OnInit {
  @Input('user') user:User;
  private userAlbumIds: Array<number>;
  public albums: Album[]

  constructor(private dataService: DataService) { }

  getAlbums(): void {
    this.dataService
        .getAlbums()
        .then(albums => this.albums = albums);
  }

  selectAlbum(album:Album) {
    this.dataService.updateUserAlbums(this.user.id,album, "add");
  }

  ngOnInit(): void {
    this.userAlbumIds = this.user.albumIds;
    this.getAlbums();
  }
}
