import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { StudentsItemComponent } from '../../../components/students_item/students_item.component';
import { Student } from '../../../interfaces/student';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { ClassSimple } from '../../../interfaces/classsimple';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  imports: [StudentsItemComponent],
})

export class StudentsComponent implements OnInit{
  constructor(private _router: Router) { }
  students: Student[] = [];
  classes: ClassSimple[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Student[]>(API_ENDPOINT + "admin/students/", {headers: this.headers})
    .subscribe(response => {
      this.students = response;
    })
    this.http.get<ClassSimple[]>(API_ENDPOINT + "admin/classes/", {headers: this.headers})
    .subscribe(response => {
      this.classes = response;
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/students/create')
  }

}


