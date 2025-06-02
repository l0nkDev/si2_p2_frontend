import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpXhrBackend} from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../../../constants';

export interface Response {
  access_token: string
}

@Component({
  selector: 'subjectarea',
  templateUrl: './create.component.html',
  imports: [FormsModule],
})
export class CreateAreaComponent {
  constructor(private _router: Router) { }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  headers = new HttpHeaders();
  name = '';


  runcreate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response>(
      API_ENDPOINT + "admin/subjectareas/",
      {
        "title": this.name,
      }
        ,{headers: this.headers})
      .subscribe(response => {
      this._router.navigateByUrl('admin/subjects');
    }
  );
  }
}
