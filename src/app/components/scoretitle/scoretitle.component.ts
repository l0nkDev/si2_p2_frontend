import { Component, Input, Output, numberAttribute, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { API_ENDPOINT } from '../../constants';
import { Assistance, StudentAssistance } from '../../interfaces/assistance';

@Component({
  selector: 'scoretitle',
  templateUrl: './scoretitle.component.html',
  imports: [FormsModule]
})

export class ScoreTitle implements OnInit{
  headers = new HttpHeaders();
  status: string = '';
  id: number = 0;
  @Input() session: number = 0;
  @Input() date: Date | null = null;
  @Input() assistances: StudentAssistance | null = null;

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    if (this.assistances == null) return
    for (var assistance of this.assistances?.assistances) {
      if (assistance.date == this.date) {
        this.status = assistance.status
        this.id = assistance.id
        return
      }
    }
    this.status = 'missed'
  }

  updateAssistance() {
    if (this.id == 0) {
      this.http.post(API_ENDPOINT + "teacher/assistance/",
        {
          "status": this.status,
          "student": this.assistances?.id,
          "session": this.session
        },
        {headers: this.headers})
      .subscribe(response => {console.log('logrado')})
    } else {
      this.http.put(API_ENDPOINT + "teacher/assistance/" + this.id + "/",
        {
          "id": this.id,
          "status": this.status,
          "student": this.assistances?.id,
          "session": this.session
        },
        {headers: this.headers})
      .subscribe(response => {console.log('logrado')})
    }
  }
}
