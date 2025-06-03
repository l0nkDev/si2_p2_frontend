import { Component, Input, Output, numberAttribute, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Class, DashboardSubject } from '../../../interfaces/dashboardsubject';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'student_entry',
  templateUrl: './student_entry.component.html',
  imports: [FormsModule, RouterLink, DecimalPipe]
})
export class StudentEntryComponent {
  isEditable = 'disabled';
  @Input() class: Class | null = null;
  @Input() subject: DashboardSubject | null = null;
  expanded = false;

  toggleExpanded() {
    this.expanded = !this.expanded
  }

  getAverage(): number {
    if (this.class == null) return 0
    var sum = 0;
    var n = 0;
    for (var st of this.class.students) {
      sum += st.scores.average
      n++
    }
    return n == 0 ? 0 : sum/n
  }

  gotoProfile(id: number) {

  }

}
