import { Score } from './../../../interfaces/score';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { SubjectsItemComponent } from '../../../components/subjects_item/subjects_item.component';
import { DashboardSubject } from '../../../interfaces/dashboardsubject';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'teachers',
  templateUrl: './subjects.component.html',
  imports: [SubjectsItemComponent, DecimalPipe],
})

export class SubjectsComponent implements OnInit{
  constructor(private _router: Router) { }
  subjects: DashboardSubject[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<DashboardSubject[]>(API_ENDPOINT + "teacher/subjects/", {headers: this.headers})
    .subscribe(response => {
      this.subjects = response;
      console.log(response)
      console.log(this.subjects);
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/teachers/create')
  }

  getClasses() {
    var sum = 0;
    for (var sub of this.subjects) {
      sum += sub.classes.length
    }
    return sum;
  }

  getStudents() {
    var sum = 0;
    for (var sub of this.subjects) {
      for (var cl of sub.classes) {
        sum += cl.students.length
      }
    }
    return sum;
  }

  getAverage() {
    var sum = 0;
    var n = 0;
    for (var sub of this.subjects) {
      for (var cl of sub.classes) {
        for (var st of cl.students) {
          sum += st.scores.average
          n += 1
        }
      }
    }
    return n == 0 ? 0 : (sum/n);
  }
}


