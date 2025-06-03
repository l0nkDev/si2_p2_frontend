import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { Subject, SubjectArea } from '../../../interfaces/subjectarea';
import { AdminSubjectsItem } from '../../../components/adminsubjects_item/adminsubjects_item.component';

@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  imports: [AdminSubjectsItem],
})

export class SubjectAreasComponent implements OnInit{
  constructor(private _router: Router) { }
  subjectareas: SubjectArea[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<SubjectArea[]>(API_ENDPOINT + "admin/subjectareas/list", {headers: this.headers})
    .subscribe(response => {
      this.subjectareas = response;
    })
  }

  calculateAreaHeight(area: SubjectArea): number {
    var c = 1;
    for (var subject of area.subjects) { c++;
      for (var _class of subject.classes) { c++ } }
    return c;
  }

  calculateSubjectHeight(subject: Subject): number {
    var c = 1;
      for (var _class of subject.classes) { c++ }
    return c;
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/subjectareas/create')
  }

}


