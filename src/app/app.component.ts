import { User } from './interfaces/user';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  islogged = false;
  user: User | null = null
  headers = new HttpHeaders();
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  constructor (private _router: Router) {}

  ngOnInit() {
    this.setup();
  }

  setup() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<User>('http://l0nk5erver.duckdns.org:5000/api/users/self/', {headers: this.headers, observe: 'response'})
    .subscribe(_ => {
      if (_.status == 200) {
        this.user = _.body;
        this.islogged = true;
        if (this.user?.role == 'A' && !this._router.url.startsWith('/admin')) { this._router.navigate(['/admin', 'logs']); }
        if (this.user?.role == 'S' && !this._router.url.startsWith('/student')) { this._router.navigate(['/student']); }
        if (this.user?.role == 'T' && !this._router.url.startsWith('/teacher')) { this._router.navigate(['/teacher']); }
      }})
  }

  logout() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<User>('http://l0nk5erver.duckdns.org:5000/api/auth/logout/', {}, {headers: this.headers, observe: 'response'})
    .subscribe(_ => {
        sessionStorage.removeItem('token')
        this.user = null;
        this.islogged = false;
        this._router.navigate(['/']);
    });
  }
}
