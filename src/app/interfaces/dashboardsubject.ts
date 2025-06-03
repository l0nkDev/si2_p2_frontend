export interface Scores {
    average: number
    prediction: number
    A: number
    B: number
}

export interface Student {
  id: number,
  name: string,
  lname: string,
  ci: number,
  phone: number,
  email: string,
  rude: number,
  scores: Scores
}

export interface Class {
  id: number,
  grade: number,
  parallel: string,
  stage: string,
  year: number,
  students: Student[]
}

export interface DashboardSubject {
  id: number,
  title: string,
  teacher: number,
  area: number,
  classes: Class[]
}
