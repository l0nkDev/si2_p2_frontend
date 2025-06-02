import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpXhrBackend} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ENDPOINT } from '../../../../constants';

export interface Response {
  access_token: string
}

@Component({
  selector: 'subjectarea',
  templateUrl: './create.component.html',
  imports: [FormsModule],
})
export class CreateParticipationComponent {
  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.subject = params["subject"]; this.class = params["class"];  this.student = params["student"];});
  }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  headers = new HttpHeaders();
  description = '';
  grade = 0;
  subject = 0;
  class = 0;
  student = 0;



  runcreate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response>(
      API_ENDPOINT + "teacher/subjects/" + this.subject + '/' + this.class + '/participation/',
      {
        "description": this.description,
        "score": this.grade,
        "student": this.student,
      }
        ,{headers: this.headers})
      .subscribe(response => {
      this._router.navigateByUrl('teacher/subjects/' + this.subject + '/classes/' + this.class +  '/participation');
    }
  );
  }
}
