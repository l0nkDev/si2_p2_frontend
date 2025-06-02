import { ClassSimple } from "./classsimple";
import { Teacher } from "./teacher";

export interface Subject {
  id: number;
  title: string;
  teacher: Teacher;
  classes: ClassSimple[];
}

export interface SubjectArea {
  id: number;
  title: string;
  subjects: Subject[];
}

