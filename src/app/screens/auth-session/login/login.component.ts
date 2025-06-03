import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';

export interface Response {
  access_token: string
  role: string
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
      API_ENDPOINT + "auth/login/",
      {
        "login": this.login,
        "password": this.password
      }
    ).subscribe(response => {
      sessionStorage.setItem('token', response.access_token);
      console.log('router reached');
      if (response.role == 'A') { this._router.navigate(['/admin', 'logs']); }
      if (response.role == 'S') { this._router.navigate(['/student']); }
      if (response.role == 'T') { this._router.navigate(['/teacher']); }
    }
  );
  }
}
