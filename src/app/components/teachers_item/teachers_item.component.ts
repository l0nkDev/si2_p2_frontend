import { Component, Input, Output, numberAttribute, EventEmitter } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { API_ENDPOINT } from '../../constants';

@Component({
  selector: 'teachers_item',
  templateUrl: './teachers_item.component.html',
  imports: [FormsModule]
})
export class TeachersItemComponent {
  isEditable = 'disabled';
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input() name: string = '';
  @Input() lname: string = '';
  @Input({transform: numberAttribute}) ci: number = 0;
  @Input({transform: numberAttribute}) phone: number = 0;
  @Input() email: string = '';
  @Output() entryDeletedEvent = new EventEmitter<string>()

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  OnEntryButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.delete(API_ENDPOINT + "admin/teachers/" + this.id + "/", {headers: this.headers})
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
      this.http.put(API_ENDPOINT + "admin/teachers/" + this.id + "/",
        {
          "id": this.id,
          "name": this.name,
          "lname": this.lname,
          "ci": this.ci,
          "phone": this.phone,
          "email": this.email,
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
