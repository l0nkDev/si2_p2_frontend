import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { StudentsItemComponent } from '../../../components/students_item/students_item.component';
import { Student } from '../../../interfaces/student';
import { Router } from '@angular/router';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  imports: [StudentsItemComponent],
})

export class StudentsComponent implements OnInit{
  constructor(private _router: Router) { }
  students: Student[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Student[]>("http://l0nk5erver.duckdns.org:5000/api/students/", {headers: this.headers})
    .subscribe(response => {
      this.students = response;
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('/students/create')
  }

}


