export interface SubjectSimple {
  id: number;
  title: string;
  scores: Prediction;
}

export interface Prediction {
  average: number;
  prediction: number;
  A: number;
  B: number;
}

export interface StudentClass {
id: number;
grade: number;
parallel: string;
stage: string;
year: number;
subjects: SubjectSimple[]
}
