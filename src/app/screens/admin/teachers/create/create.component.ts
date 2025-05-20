import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { Router } from '@angular/router';

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


  runcreate() {
    this.http.post<Response>(
      "http://l0nk5erver.duckdns.org:5000/api/teachers/",
      {
        "name": this.name,
        "lname": this.lname,
        "ci": this.ci,
        "phone": this.phone,
        "email": this.email,
      }
    ).subscribe(response => {
      sessionStorage.setItem('token', response.access_token);
      console.log('router reached');
      this._router.navigateByUrl('/teachers');
    }
  );
  }
}
