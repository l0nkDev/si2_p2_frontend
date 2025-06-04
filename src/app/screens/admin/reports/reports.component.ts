import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { API_ENDPOINT } from '../../../constants';
import { Report } from '../../../interfaces/report';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'reportes',
  templateUrl: './reports.component.html',
  imports: [FormsModule],
})

export class ReportsComponent implements OnInit{
  reports: Report[] = [];
  api = API_ENDPOINT
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  type = 'logs'
  role = 'any'
  s = true
  since = 'any'
  u = true
  until = 'any'

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Report[]>(API_ENDPOINT + "admin/reports/new/"
      , {headers: this.headers})
    .subscribe(_ => {
      this.reports = _;
    })
  }

  date(str: string) {
    return formatDate(Date.parse(str), 'dd-MM-yyyy - HH:mm:ss', 'en-US');
  }

  createLog() {
    if (!this.u) { this.until = 'any' }
    if (!this.s) { this.since = 'any' }

    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Report[]>(API_ENDPOINT + "admin/reports/new/",
      {
        "params": "type=logs&since=" + this.since + "&until=" + this.until + "&role=" + this.role,
        "title": "BITÁCORA"
      }
      , {headers: this.headers})
    .subscribe(_ => { this.fetchContent() })
  }

  createStudents() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Report[]>(API_ENDPOINT + "admin/reports/new/",
      {
        "params": "type=students",
        "title": "ESTUDIANTES"
      }
      , {headers: this.headers})
    .subscribe(_ => { this.fetchContent() })
  }

  createTeachers() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Report[]>(API_ENDPOINT + "admin/reports/new/",
      {
        "params": "type=teachers",
        "title": "DOCENTES"
      }
      , {headers: this.headers})
    .subscribe(_ => { this.fetchContent() })
  }

  createUsers() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Report[]>(API_ENDPOINT + "admin/reports/new/",
      {
        "params": "type=users",
        "title": "USUARIOS"
      }
      , {headers: this.headers})
    .subscribe(_ => { this.fetchContent() })
  }

}


