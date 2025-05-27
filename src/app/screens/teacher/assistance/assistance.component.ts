import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { Assistance } from '../../../interfaces/assistance';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'assistance',
  templateUrl: './assistance.component.html',
  imports: [FormsModule],
})

export class AssistanceComponent implements OnInit{
id: number = 0;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.fetchContent() });
  }

  assistances: Assistance[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Assistance[]>(API_ENDPOINT + "teacher/assistance/", {headers: this.headers})
    .subscribe(response => {
      this.assistances = response;
      console.log(this.assistances);
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this._router.navigateByUrl('admin/teachers/create')
  }

}


