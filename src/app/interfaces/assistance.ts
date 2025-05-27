import { Student } from "./student";

export interface Assistance {
id: number;
date: string;
status: string;
_class: number;
student: Student;
subject: number;
}
