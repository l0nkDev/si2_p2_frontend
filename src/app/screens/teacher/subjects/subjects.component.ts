import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { Subject } from '../../../interfaces/subject';
import { SubjectsItemComponent } from '../../../components/subjects_item/subjects_item.component';

@Component({
  selector: 'teachers',
  templateUrl: './subjects.component.html',
  imports: [SubjectsItemComponent],
})

export class SubjectsComponent implements OnInit{
  constructor(private _router: Router) { }
  subjects: Subject[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Subject[]>(API_ENDPOINT + "teacher/subjects/", {headers: this.headers})
    .subscribe(response => {
      this.subjects = response;
      console.log(this.subjects);
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/teachers/create')
  }

}


