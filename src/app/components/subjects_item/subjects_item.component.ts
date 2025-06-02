import { Component, Input, Output, numberAttribute, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { API_ENDPOINT } from '../../constants';
import { ClassSimple } from '../../interfaces/classsimple';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'subjects_item',
  templateUrl: './subjects_item.component.html',
  imports: [FormsModule, RouterLink]
})
export class SubjectsItemComponent implements OnInit{
  isEditable = 'disabled';
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input({transform: numberAttribute}) teacher: number = 0;
  @Input() title: string = '';
  @Input() classes: ClassSimple[] = [];
  @Output() entryDeletedEvent = new EventEmitter<string>()

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.classes.sort((a,b) => (a.stage+a.grade+a.parallel).localeCompare(b.stage+b.grade+b.parallel))
  }

}
