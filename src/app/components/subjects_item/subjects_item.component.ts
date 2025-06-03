import { Component, Input, Output, numberAttribute, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DashboardSubject } from '../../interfaces/dashboardsubject';
import { StudentEntryComponent } from './student_entry/student_entry.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'subjects_item',
  templateUrl: './subjects_item.component.html',
  imports: [FormsModule, StudentEntryComponent, DecimalPipe]
})
export class SubjectsItemComponent implements OnInit{
  toggled = false;
  @Input() subject: DashboardSubject | null = null;

  ngOnInit() {
    this.subject?.classes.sort((a,b) => (a.stage+a.grade+a.parallel).localeCompare(b.stage+b.grade+b.parallel))
  }

  toggleExpanded() {
    this.toggled = !this.toggled
  }

  countStudents() {
    var sum = 0;
    if (this.subject == null) return 0
    for (var cl of this.subject?.classes) {
      sum += cl.students.length
    }
    return sum;
  }

  getAverage() {
    var sum = 0;
    var num = 0;
    if (this.subject == null) return 0
    for (var cl of this.subject.classes) {
      for (var st of cl.students) {
        sum += st.scores.average
        num += 1
      }
    }
    return num == 0 ? 0 : (sum/num);
  }

}
