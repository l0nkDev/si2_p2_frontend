import { CreateStudentComponent } from './screens/admin/students/create/create.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './screens/auth-session/login/login.component';
import { StudentsComponent } from './screens/admin/students/students.component';
import { TeachersComponent } from './screens/admin/teachers/teachers.component';
import { CreateTeacherComponent } from './screens/admin/teachers/create/create.component';
import { UsersComponent } from './screens/admin/users/users.component';
import { SubjectsComponent } from './screens/teacher/subjects/subjects.component';
import { AssistanceComponent } from './screens/teacher/assistance/assistance.component';

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
    path: 'teacher/:id/assistance',
    title: 'Asistencias',
    component: AssistanceComponent
  },
  {
    path: 'teacher',
    title: 'Materias',
    component: SubjectsComponent
  }
];
