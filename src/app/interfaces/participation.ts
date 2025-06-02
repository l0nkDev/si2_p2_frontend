export interface Participation {
  id: number;
  subject: number;
  student: number;
  _class: number;
  date: Date;
  description: string;
  score: number;
}

export interface ParticipationEntry {
  id: number;
  name: string;
  lname: string;
  ci: number;
  phone: number;
  email: string;
  rude: number;
  participations: Participation[]
}
