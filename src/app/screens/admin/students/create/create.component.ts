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
export class CreateStudentComponent {
  constructor(private _router: Router) { }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  headers = new HttpHeaders();
  name = '';
  lname = '';
  ci = 0;
  phone = 0;
  email = '';
  rude = 0;


  runcreate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response>(
      API_ENDPOINT + "admin/students/",
      {
        "name": this.name,
        "lname": this.lname,
        "ci": this.ci,
        "phone": this.phone,
        "email": this.email,
        "rude": this.rude
      }
        ,{headers: this.headers})
      .subscribe(response => {
      this._router.navigateByUrl('admin/students');
    }
  );
  }
}
