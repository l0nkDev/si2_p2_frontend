import { CreateStudentComponent } from './screens/admin/students/create/create.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './screens/auth-session/login/login.component';
import { StudentsComponent } from './screens/admin/students/students.component';
import { TeachersComponent } from './screens/admin/teachers/teachers.component';
import { CreateTeacherComponent } from './screens/admin/teachers/create/create.component';
import { UsersComponent } from './screens/admin/users/users.component';
import { SubjectsComponent } from './screens/teacher/subjects/subjects.component';
import { AssistanceComponent } from './screens/teacher/assistance/assistance.component';
import { GradesComponent } from './screens/teacher/grades/grades.component';
import { ParticipationComponent } from './screens/teacher/participation/participation.component';
import { StudentComponent } from './screens/public/student/student.component';
import { SubjectAreasComponent } from './screens/admin/subjects/subjects.component';
import { CreateAreaComponent } from './screens/admin/subjects/create_area/create.component';
import { CreateSubjectComponent } from './screens/admin/subjects/create_subject/create.component';
import { AssignSubjectComponent } from './screens/admin/subjects/assign_class/assign.component';
import { StudentSubjectsComponent } from './screens/student/subjects/subjects.component';
import { StudentAssistanceComponent } from './screens/student/assistance/assistance.component';
import { CreateParticipationComponent } from './screens/teacher/participation/create/create.component';
import { EditParticipationComponent } from './screens/teacher/participation/edit/edit.component';
import { StudentParticipationComponent } from './screens/student/participation/participation.component';
import { StudentGradesComponent } from './screens/student/grades/grades.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: LoginComponent
  },
  {
    path: 'admin/students/create',
    title: 'Estudiantes',
    component: CreateStudentComponent
  },
  {
    path: 'admin/students',
    title: 'Estudiantes',
    component: StudentsComponent
  },
  {
    path: 'admin/teachers/create',
    title: 'Docentes',
    component: CreateTeacherComponent
  },
  {
    path: 'admin/teachers',
    title: 'Docentes',
    component: TeachersComponent
  },
  {
    path: 'admin/users',
    title: 'Usuarios',
    component: UsersComponent
  },
  {
    path: 'teacher/subjects/:id/classes/:class/assistance',
    title: 'Asistencias',
    component: AssistanceComponent
  },
  {
    path: 'teacher/subjects/:id/classes/:class/grades',
    title: 'Notas',
    component: GradesComponent
  },
  {
    path: 'teacher/subjects/:subject/classes/:class/participation/create/:student',
    title: 'Crear participación',
    component: CreateParticipationComponent
  },
  {
    path: 'teacher/subjects/:subject/classes/:class/participation/edit/:id',
    title: 'Editar participación',
    component: EditParticipationComponent
  },
  {
    path: 'teacher/subjects/:id/classes/:class/participation',
    title: 'Participación',
    component: ParticipationComponent
  },
  {
    path: 'teacher',
    title: 'Materias',
    component: SubjectsComponent
  },
  {
    path: 'student/:id',
    title: 'Estudiante',
    component: StudentComponent
  },
  {
    path: 'student/subjects/:id/classes/:class/assistance',
    title: 'Asistencias',
    component: StudentAssistanceComponent
  },
  {
    path: 'student/subjects/:id/classes/:class/participation',
    title: 'Participación',
    component: StudentParticipationComponent
  },
  {
    path: 'student/subjects/:id/classes/:class/grades',
    title: 'Notas',
    component: StudentGradesComponent
  },
  {
    path: 'student',
    title: 'Materias',
    component: StudentSubjectsComponent
  },
  {
    path: 'admin/subjectareas/:id/subjects/create',
    title: 'Creacion de materia',
    component: CreateSubjectComponent
  },
  {
    path: 'admin/subjectareas/create',
    title: 'Creación de area',
    component: CreateAreaComponent
  },
  {
    path: 'admin/subjects',
    title: 'Materias',
    component: SubjectAreasComponent
  },
  {
    path: 'admin/subjects/:id/assign',
    title: 'Asignación de materia',
    component: AssignSubjectComponent
  },
];
