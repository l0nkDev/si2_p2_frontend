import { Component, Input, Output, numberAttribute, EventEmitter } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { API_ENDPOINT } from '../../constants';
import { RouterLink } from '@angular/router';
import { ClassSimple } from '../../interfaces/classsimple';

@Component({
  selector: 'students_item',
  templateUrl: './students_item.component.html',
  imports: [FormsModule, RouterLink]
})
export class StudentsItemComponent {
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
  @Input({transform: numberAttribute}) rude: number = 0;
  @Input() classes: ClassSimple[] = [];
  @Input() selectedclass: number = 0;
  @Output() entryDeletedEvent = new EventEmitter<string>()

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  OnEntryButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.delete<Response[]>(API_ENDPOINT + "admin/students/" + this.id + "/", {headers: this.headers})
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
      this.http.put<Response[]>(API_ENDPOINT + "admin/students/" + this.id + "/",
        {
          "id": this.id,
          "name": this.name,
          "lname": this.lname,
          "ci": this.ci,
          "phone": this.phone,
          "email": this.email,
          "rude": this.rude,
        }
        ,{headers: this.headers})
      .subscribe(_ => {
        this.isEditable = 'disabled'
        this.entryDeletedEvent.emit("")
        console.log("emitido")
      });
    }
  }

  assignClass() {
      console.log('logrado');
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.post(API_ENDPOINT + "admin/students/" + this.id + "/assign/",
        {
          "student": this.id,
          "class": this.selectedclass
        }
        ,{headers: this.headers})
      .subscribe(_ => {});
  }
}
