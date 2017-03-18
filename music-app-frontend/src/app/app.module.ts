import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routing/app-routing.module';

// Components
import { AppComponent }         from './app.component';
import { UsersComponent }      from './users/users.component';
import { UserComponent }      from './user/user.component';
import { AlbumsComponent }      from './albums/albums.component';
import { UserAlbumsComponent }      from './user/user-albums/user-albums.component';
import { UserPostsComponent }      from './user/user-posts/user-posts.component';

// Services
import { DataService }          from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    AlbumsComponent,
    UserAlbumsComponent,
    UserPostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
