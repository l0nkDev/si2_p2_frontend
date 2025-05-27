import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { User } from '../../../interfaces/user';
import { UsersItemComponent } from '../../../components/users_item/users_item.component';

@Component({
  selector: 'teachers',
  templateUrl: './users.component.html',
  imports: [UsersItemComponent],
})

export class UsersComponent implements OnInit{
  constructor(private _router: Router) { }
  users: User[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<User[]>(API_ENDPOINT + "admin/users/", {headers: this.headers})
    .subscribe(response => {
      this.users = response;
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/users/create')
  }

}


