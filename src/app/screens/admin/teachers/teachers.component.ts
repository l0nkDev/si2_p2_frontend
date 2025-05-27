import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { TeachersItemComponent } from '../../../components/teachers_item/teachers_item.component';
import { Router } from '@angular/router';
import { Teacher } from '../../../interfaces/teacher';
import { API_ENDPOINT } from '../../../constants';

@Component({
  selector: 'teachers',
  templateUrl: './teachers.component.html',
  imports: [TeachersItemComponent],
})

export class TeachersComponent implements OnInit{
  constructor(private _router: Router) { }
  teachers: Teacher[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Teacher[]>(API_ENDPOINT + "admin/teachers/", {headers: this.headers})
    .subscribe(response => {
      this.teachers = response;
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/teachers/create')
  }

}


