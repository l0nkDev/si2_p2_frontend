import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { API_ENDPOINT } from '../../../constants';
import { FormsModule } from '@angular/forms';
import { Score, ScoreResponse, ScoreTarget } from '../../../interfaces/score';

@Component({
  selector: 'assistance',
  templateUrl: './grades.component.html',
  imports: [FormsModule],
})

export class StudentGradesComponent implements OnInit{
id: number = 0;
class: number = 0;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params =>  { this.id = params["id"]; this.class = params["class"]; this.fetchContent() });
  }

  entries: ScoreResponse[] = [];
  entry: ScoreResponse | null = null;
  targets: ScoreTarget[] = [];
  sem1t: ScoreTarget[] = [];
  sem2t: ScoreTarget[] = [];
  sem3t: ScoreTarget[] = [];

  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<ScoreResponse>(API_ENDPOINT + "student/subjects/" + this.id + "/" + this.class + "/scores/", {headers: this.headers})
    .subscribe(response => {
      this.entry = response;
    })
    this.http.get<ScoreTarget[]>(API_ENDPOINT + "student/subjects/" + this.id + "/" + this.class + "/scores/targets/", {headers: this.headers})
    .subscribe(response => {
      this.targets = response;
      this.sem1t = []
      this.sem2t = []
      this.sem3t = []
      for (var t of this.targets) {
        if (t.trimester == 1) this.sem1t.push(t)
        if (t.trimester == 2) this.sem2t.push(t)
        if (t.trimester == 3) this.sem3t.push(t)
      }
    })
  }

  findValue(target: ScoreTarget, entry: ScoreResponse): number {
    for (var score of entry.scores) {
      if (target.id == score.target) {
        return score.score
      }
    }
    return 0
  }

  getAverage(semester: number, entry: ScoreResponse): number {
    var sum = 0;
    for (var e of entry.scores) { if (semester == this.getSemester(e)) { sum += e.score} }
    if (sum == 0) return 0;
    if (semester == 1) { return (Math.round(((sum/this.sem1t.length) + Number.EPSILON) * 100) / 100) }
    if (semester == 1) { return (Math.round(((sum/this.sem2t.length) + Number.EPSILON) * 100) / 100) }
    return (Math.round(((sum/this.sem3t.length) + Number.EPSILON) * 100) / 100)
  }

  getSemester(s: Score): number {
    for (var e of this.sem1t) { if (e.id == s.target) {return 1} }
    for (var e of this.sem2t) { if (e.id == s.target) {return 2} }
    for (var e of this.sem3t) { if (e.id == s.target) {return 3} }
    return 0;
  }
}


