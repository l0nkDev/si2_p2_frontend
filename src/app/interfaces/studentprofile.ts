export interface Score {
  average: number
  prediction: number
  A: number
  B: number
}

export interface Subject {
  id: number,
  title: string,
  scores: Score
}

export interface Class {
  id: number,
  grade: number,
  parallel: string,
  stage: string,
  year: number,
  subjects: Subject[]
}

export interface StudentProfile {
  id: number
  name: string
  lname: string
  ci: number
  phone: number
  email: string
  rude: number
  classes: Class
}
