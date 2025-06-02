export interface ScoreTarget {
  id: number;
  subject: number;
  _class: number
  title: string;
  trimester: number;
}

export interface Score {
  id: number;
  student: number;
  target: number;
  score: number;
}

export interface ScoreResponse {
  id: number;
  name: string;
  lname: string;
  ci: number;
  phone: number;
  email: string;
  rude: number;
  scores: Score[];
}
