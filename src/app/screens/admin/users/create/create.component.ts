import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpXhrBackend} from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../../../constants';

export interface Response {
  access_token: string
}

@Component({
  selector: 'login',
  templateUrl: './create.component.html',
  imports: [FormsModule],
})
export class CreateTeacherComponent {
  constructor(private _router: Router) { }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  name = '';
  lname = '';
  ci = 0;
  phone = 0;
  email = '';
  headers = new HttpHeaders();


  runcreate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response>(
      API_ENDPOINT + "admin/teachers/",
      {
        "name": this.name,
        "lname": this.lname,
        "ci": this.ci,
        "phone": this.phone,
        "email": this.email,
      }
      ,{headers: this.headers})
    .subscribe(response => {
      this._router.navigateByUrl('admin/teachers');
    }
  );
  }
}
