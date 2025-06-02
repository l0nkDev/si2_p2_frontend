import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { StudentClass } from '../../../interfaces/studentclass';

@Component({
  selector: 'teachers',
  templateUrl: './subjects.component.html',
  imports: [RouterLink],
})

export class StudentSubjectsComponent implements OnInit{
  constructor(private _router: Router) { }
  class: StudentClass | null = null;
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<StudentClass>(API_ENDPOINT + "student/subjects/", {headers: this.headers})
    .subscribe(response => {
      this.class = response;
      console.log(this.class);
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/teachers/create')
  }

}


