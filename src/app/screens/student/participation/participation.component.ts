import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { FormsModule } from '@angular/forms';
import { ParticipationEntry } from '../../../interfaces/participation';
import { formatDate } from '@angular/common';

@Component({
  selector: 'assistance',
  templateUrl: './participation.component.html',
  imports: [FormsModule, RouterLink],
})

export class StudentParticipationComponent implements OnInit{
  id: number = 0;
  class: number = 0;
  participation: ParticipationEntry | null = null;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.class = params["class"]; this.fetchContent() });
  }

  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {'student/subjects/<int:pk>/<int:_class>/participation/'
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<ParticipationEntry>(API_ENDPOINT + "student/subjects/" + this.id + "/" + this.class + "/participation/", {headers: this.headers})
    .subscribe(response => {
      this.participation = response;
    })
  }

  formatdate(date:Date, format:string, locale:string) {
    return formatDate(date, format, locale)
  }
}


