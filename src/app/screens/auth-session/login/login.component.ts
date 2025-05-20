import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { Router } from '@angular/router';

export interface Response {
  access_token: string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  constructor(private _router: Router) { }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  login = '';
  password = '';


  runlogin() {
    this.http.post<Response>(
      "http://l0nk5erver.duckdns.org:5000/api/auth/login/",
      {
        "login": this.login,
        "password": this.password
      }
    ).subscribe(response => {
      sessionStorage.setItem('token', response.access_token);
      console.log('router reached');
      this._router.navigateByUrl('/');
    }
  );
  }
}
