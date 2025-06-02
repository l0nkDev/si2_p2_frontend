import { Assistance, StudentAssistance } from './../../../interfaces/assistance';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { FormsModule } from '@angular/forms';
import { ClassSession } from '../../../interfaces/classsession';
import { formatDate } from '@angular/common';
import { AssistanceItem } from '../../../components/assistance_item/assistance_item.component';

export interface DateSessionPair {
  date: Date;
  session: ClassSession;
}

@Component({
  selector: 'assistance',
  templateUrl: './assistance.component.html',
  imports: [FormsModule, RouterLink, AssistanceItem],
})


export class AssistanceComponent implements OnInit{
id: number = 0;
class: number = 0;
todaysclass: ClassSession | null = null;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.class = params["class"]; this.fetchContent() });
  }

  assistances: StudentAssistance[] = [];
  dates: DateSessionPair[] = [];

  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<StudentAssistance[]>(API_ENDPOINT + "teacher/subjects/"+this.id+"/"+this.class+"/"+"assistance/", {headers: this.headers})
    .subscribe(response => {
      this.assistances = response;
    })

    this.http.get<ClassSession[]>(API_ENDPOINT + "teacher/subjects/"+this.id+"/"+this.class+"/"+"assistance/sessions/", {headers: this.headers})
    .subscribe(response => {
      this.dates = []
      for (var i of response) {
        var t: DateSessionPair = {date: i.date, session: i}
        this.dates.push(t)
      }
      this.dates.sort()
    })

    this.http.get<ClassSession>(API_ENDPOINT + "teacher/subjects/"+this.id+"/"+this.class+"/"+"assistance/sessions/today/", {headers: this.headers})
    .subscribe(response => { this.todaysclass = response; console.log(this.todaysclass)})

  }

  getStatus(assistances: Assistance[], date: Date): string {
    for (var assistance of assistances) {
      if (assistance.date == date) {
        return assistance.status
      }
    }
    return 'missed'
  }

  formatdate(date:Date, format:string, locale:string) {
    return formatDate(date, format, locale)
  }

  startClass() {
    this.http.post<ClassSession>(API_ENDPOINT + "teacher/subjects/"+this.id+"/"+this.class+"/"+"assistance/sessions/today/",
      {
        "status": "S"
      },
      {headers: this.headers})
    .subscribe(response => {this.fetchContent()})
  }

  updateClass() {
    this.http.post<ClassSession>(API_ENDPOINT + "teacher/subjects/"+this.id+"/"+this.class+"/"+"assistance/sessions/today/",
      {
        "status": this.todaysclass?.status
      },
      {headers: this.headers})
    .subscribe(response => {this.fetchContent()})
  }

  updateAssistance() {

  }

}


