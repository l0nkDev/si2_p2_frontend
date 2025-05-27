import { Component, Input, Output, numberAttribute, EventEmitter } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { API_ENDPOINT } from '../../constants';
import { ClassSimple } from '../../interfaces/classsimple';

@Component({
  selector: 'subjects_item',
  templateUrl: './subjects_item.component.html',
  imports: [FormsModule]
})
export class SubjectsItemComponent {
  isEditable = 'disabled';
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input({transform: numberAttribute}) teacher: number = 0;
  @Input() title: string = '';
  @Input() classes: Array<ClassSimple> = [];
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
