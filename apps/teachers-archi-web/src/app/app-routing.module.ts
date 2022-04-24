import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'ues',
    loadChildren: () =>
      import('./pages/profile-details/profile-details.module').then(
        (m) => m.ProfileDetailsModule
      ),
  },
  {
    path: 'cours',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'cours/:id',
    loadChildren: () =>
      import('./pages/course-details/course-details.module').then(
        (m) => m.CourseDetailsModule
      ),
  },
  {
    path: 'uesRestantes',
    loadChildren: () =>
      import('./pages/ues-left/ues-left.module').then((m) => m.UesLeftModule),
  },
  {
    path: 'gestion',
    loadChildren: () =>
      import('./pages/admin-teachers/admin-teachers.module').then(
        (m) => m.AdminTeachersModule
      ),
  },
  {
    path: 'gestion/:id',
    loadChildren: () =>
      import('./pages/admin-edit/admin-edit.module').then(
        (m) => m.AdminEditModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
