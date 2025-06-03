import { Component, Input, Output, numberAttribute, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { Subject, SubjectArea } from '../../interfaces/subjectarea';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[adminsubjects_item]',
  templateUrl: './adminsubjects_item.component.html',
  imports: [FormsModule, RouterLink]
})

export class AdminSubjectsItem{
  headers = new HttpHeaders();
  @Input() subjectarea: SubjectArea | null = null;
  toggled = false;

  toggleExpanded() {
    this.toggled = !this.toggled;
  }

    calculateAreaHeight(area: SubjectArea): number {
      var c = 1;
      for (var subject of area.subjects) { c++;
        for (var _class of subject.classes) { c++ } }
      return c;
    }

    calculateSubjectHeight(subject: Subject): number {
      var c = 1;
        for (var _class of subject.classes) { c++ }
      return c;
    }

}
