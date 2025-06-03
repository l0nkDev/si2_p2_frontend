import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { StudentProfile } from '../../../interfaces/studentprofile';

export interface Response {
  access_token: string
}

@Component({
  selector: 'login',
  templateUrl: './student.component.html',
  imports: [FormsModule],
})
export class StudentComponent {
  profile: StudentProfile | null = null
  id: number = 0

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.fetchContent() });
  }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  login = '';
  password = '';

  fetchContent() {
    this.http.get<StudentProfile>(
      API_ENDPOINT + "students/" + this.id +"/",
    ).subscribe(response => { this.profile = response; console.log(this.profile) } );
  }
}
