import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpXhrBackend} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { API_ENDPOINT } from '../../../../constants';
import { SubjectArea } from '../../../../interfaces/subjectarea';
import { Teacher } from '../../../../interfaces/teacher';

@Component({
  selector: 'subjectarea',
  templateUrl: './create.component.html',
  imports: [FormsModule],
})
export class CreateSubjectComponent implements OnInit{
id: number = 0;
areaname: string = '';
teachers: Teacher[] = [];
teacherid: number = 0;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.fetchContent() });
  }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  headers = new HttpHeaders();
  name = '';

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<SubjectArea[]>(API_ENDPOINT + "admin/subjectareas/", {headers: this.headers})
    .subscribe(response => {
      for (var res of response) { if (res.id == this.id) {this.areaname = res.title} }
    })
    this.http.get<Teacher[]>(API_ENDPOINT + "admin/teachers/", {headers: this.headers})
    .subscribe(response => { this.teachers = response })
  }

  runcreate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response>(
      API_ENDPOINT + "admin/subjects/",
      {
        "title": this.name,
        "teacher": this.teacherid,
        "area": this.id
      }
        ,{headers: this.headers})
      .subscribe(response => {
      this._router.navigateByUrl('admin/subjects');
    }
  );
  }
}
