export interface Assistance {
  id: number;
  status: string;
  date: Date;
}

export interface StudentAssistance {
id: number;
name: string;
lname: string;
ci: number;
rude: number;
assistances: Assistance[];
}
