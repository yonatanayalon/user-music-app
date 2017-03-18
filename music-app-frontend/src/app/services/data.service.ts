import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { Album } from '../models/album';
import { Post } from '../models/post';

@Injectable()
export class DataService {

  private users:User[];
  private albums: Album[];
  
  private usersCache: Array<User[]> = [];

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:3000/users';  // URL to Users
  private albumsUrl = 'http://localhost:3000/albums';  // URL to Albums
  private userAlbumsUrl = 'http://localhost:3000/users/albums';  // URL to user Albums
  private userPostsUrl = 'http://localhost:3000/users/posts';  // URL to user posts

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then((response) => this.users = response.json() as User[])
               .catch(this.handleError);
  }

  getAlbums(): Promise<Album[]> {
    if(this.albums) {
      return new Promise<Album[]>((resolve, reject) => {
        resolve(this.albums);
      });
    }
    return this.http.get(this.albumsUrl)
               .toPromise()
               .then((response) => this.albums = response.json() as Album[])
               .catch(this.handleError);               
  }

  getUserAlbums(userId:number): Promise<Album[]> {
    if(this.usersCache[userId][0].albums) {
      return new Promise<Album[]>((resolve, reject) => {
        resolve(this.usersCache[userId][0].albums);
      });
    }    
    return this.http.get(this.userAlbumsUrl+"/"+userId)
               .toPromise()
               .then((response) => this.usersCache[userId][0].albums = response.json() as Album[])
               .catch(this.handleError);    
  }
  getUserPosts(userId:number): Promise<Post[]> {
    if(this.usersCache[userId][0].posts) {
      return new Promise<Post[]>((resolve, reject) => {
        resolve(this.usersCache[userId][0].posts);
      });
    }    
    return this.http.get(this.userPostsUrl+"/"+userId)
               .toPromise()
               .then((response) => this.usersCache[userId][0].posts = response.json() as Post[])
               .catch(this.handleError);
  }  
  getUser(id:number): Promise<User> {
    if(this.usersCache && this.usersCache[id] && this.usersCache[id][0]) {
      return new Promise<User>((resolve, reject) => {
        resolve(this.usersCache[id][0]);
      });
    }
    this.usersCache[id] = [];    
    return this.http.get(this.usersUrl+"/"+id)
               .toPromise()
               .then((response) => this.usersCache[id][0] = response.json() as User)
               .catch(this.handleError);    
  }

  updateUserAlbums(userId:number,album:Album, action:string): void {
    if(this.usersCache[userId][0].albums) {
      var indexToUpdate = this.usersCache[userId][0].albumIds.indexOf(album.id);
      if (action === "add") {
        this.usersCache[userId][0].albums.push(album);
        this.usersCache[userId][0].albumIds.push(album.id);
      }
      else if(action === "remove") {
        let selectedIndex = this.usersCache[userId][0].albums.findIndex(item => item.id==album.id);
        this.usersCache[userId][0].albums.splice(selectedIndex,1);
        this.usersCache[userId][0].albumIds.splice(indexToUpdate,1);
      }
    }
  }  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

