import { Component, Input, Output, numberAttribute, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { API_ENDPOINT } from '../../constants';

@Component({
  selector: 'users_item',
  templateUrl: './users_item.component.html',
  imports: [FormsModule]
})
export class UsersItemComponent {
  isEditable = 'disabled';
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input() login: string = '';
  @Input() password: string = '';
  @Input() role: string = '';
  @Output() entryDeletedEvent = new EventEmitter<string>()

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    if (this.role == 'A') this.role = 'Admin';
    if (this.role == 'T') this.role = 'Docente';
    if (this.role == 'S') this.role = 'Estudiante';
    if (this.role == 'O') this.role = 'Dueño';
  }

  OnEntryButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.delete(API_ENDPOINT + "admin/users/" + this.id + "/", {headers: this.headers})
    .subscribe(_ => {
      this.entryDeletedEvent.emit("")
      console.log("emitido")
    });
}

  OnEditButtonClick() {
    console.log(this.isEditable)
    if (this.isEditable === 'disabled') this.isEditable = '';
    else {
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.put(API_ENDPOINT + "admin/users/" + this.id + "/",
        {
          "id": this.id,
        }
        ,{headers: this.headers})
      .subscribe(_ => {
        this.isEditable = 'disabled'
        this.entryDeletedEvent.emit("")
        console.log("emitido")
      });
    }
  }
}
