import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute }            from '@angular/router';

import { User }                from '../models/user';
import { DataService }         from '../services/data.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  getUsers(): void {
    this.dataService
        .getUsers()
        .then(users => this.users = users);
  }

  editUser(user:User){
    this.router.navigate([user.id], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
