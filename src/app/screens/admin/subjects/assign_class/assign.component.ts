import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpXhrBackend} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { API_ENDPOINT } from '../../../../constants';
import { Subject } from '../../../../interfaces/subject';
import { ClassSimple } from '../../../../interfaces/classsimple';

@Component({
  selector: 'subjectarea',
  templateUrl: './assign.component.html',
  imports: [FormsModule],
})
export class AssignSubjectComponent implements OnInit{
id: number = 0;
subjectname: string = '';
classes: ClassSimple[] = [];
classid: number = 0;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.fetchContent() });
  }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  headers = new HttpHeaders();

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Subject[]>(API_ENDPOINT + "admin/subjects/", {headers: this.headers})
    .subscribe(response => {
      for (var res of response) { if (res.id == this.id) {this.subjectname = res.title} }
    })
    this.http.get<ClassSimple[]>(API_ENDPOINT + "admin/classes/", {headers: this.headers})
    .subscribe(response => { this.classes = response })
  }

  runcreate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response>(
      API_ENDPOINT + "admin/classes/" + this.id + "/assign/",
      {
        "class": this.classid,
      }
        ,{headers: this.headers})
      .subscribe(response => {
      this._router.navigateByUrl('admin/subjects');
    }
  );
  }
}
