import { Assistance, StudentAssistance } from './../../../interfaces/assistance';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { ClassSession } from '../../../interfaces/classsession';
import { formatDate } from '@angular/common';

@Component({
  selector: 'assistance',
  templateUrl: './assistance.component.html',
  imports: [FormsModule],
})

export class StudentAssistanceComponent implements OnInit{
id: number = 0;
class: number = 0;
studentid: number = 0;
todaysclass: ClassSession | null = null;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.class = params["class"]; this.fetchContent() });
  }

  assistances: StudentAssistance[] = [];
  dates: Date[] = [];

  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<StudentAssistance[]>(API_ENDPOINT + "student/subjects/"+this.id+"/"+this.class+"/"+"assistance/", {headers: this.headers})
    .subscribe(response => { this.assistances = response; })

    this.http.get<ClassSession[]>(API_ENDPOINT + "student/subjects/"+this.id+"/"+this.class+"/"+"assistance/sessions", {headers: this.headers})
    .subscribe(response => {
      this.dates = []
      for (var i of response) {
        this.dates.push(i.date)
      }
      this.dates.sort()
    })

    this.http.get<User>(API_ENDPOINT + "users/self/", {headers: this.headers})
    .subscribe(_ => { this.studentid = _.student })

    this.http.get<ClassSession>(API_ENDPOINT + "student/subjects/"+this.id+"/"+this.class+"/"+"assistance/sessions/today/", {headers: this.headers})
    .subscribe(response => { this.todaysclass = response; console.log(this.todaysclass)})
  }

  getStatus(assistances: Assistance[], date: Date): string {
    console.log(this.dates)
    console.log(assistances)
    for (var assistance of assistances) {
      if (assistance.date == date) {
        return assistance.status
      }
    }
    return 'missed'
  }

  formatdate(date: Date, format: string, locale: string, timezone?: string | undefined) {
    return timezone? formatDate(date, format, locale, timezone) : formatDate(date, format, locale)
  }

  sendAssistance() {
    this.http.post<ClassSession>(API_ENDPOINT + "student/subjects/"+this.id+"/"+this.class+"/"+"assistance/sessions/today/", {}, {headers: this.headers})
    .subscribe(_ => { this.fetchContent() })
  }

}


