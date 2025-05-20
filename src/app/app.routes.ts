import { CreateStudentComponent } from './screens/admin/students/create/create.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './screens/auth-session/login/login.component';
import { StudentsComponent } from './screens/admin/students/students.component';
import { TeachersComponent } from './screens/admin/teachers/teachers.component';
import { CreateTeacherComponent } from './screens/admin/teachers/create/create.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: LoginComponent
  },
  {
    path: 'students/create',
    title: 'Estudiantes',
    component: CreateStudentComponent
  },
  {
    path: 'students',
    title: 'Estudiantes',
    component: StudentsComponent
  },
  {
    path: 'teachers/create',
    title: 'Docentes',
    component: CreateTeacherComponent
  },
  {
    path: 'teachers',
    title: 'Docentes',
    component: TeachersComponent
  }
];
