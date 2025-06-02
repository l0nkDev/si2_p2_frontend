export interface SubjectSimple {
  id: number;
  title: string;
}

export interface StudentClass {
id: number;
grade: number;
parallel: string;
stage: string;
year: number;
subjects: SubjectSimple[]
}
