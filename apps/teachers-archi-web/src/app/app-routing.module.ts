import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsSignedInGuard } from './is-signed-in';
import { IsSignedInNotAdminGuard } from './is-signed-in-not-Admin';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/accueil' },
  {
    path: 'accueil',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [IsSignedInNotAdminGuard],
  },
  {
    path: 'ues',
    loadChildren: () =>
      import('./pages/profile-details/profile-details.module').then(
        (m) => m.ProfileDetailsModule
      ),
    canActivate: [IsSignedInNotAdminGuard],
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
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'gestion',
    loadChildren: () =>
      import('./pages/admin-teachers/admin-teachers.module').then(
        (m) => m.AdminTeachersModule
      ),
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'gestion/:id',
    loadChildren: () =>
      import('./pages/admin-edit/admin-edit.module').then(
        (m) => m.AdminEditModule
      ),
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin-home/admin-home.module').then(
        (m) => m.AdminHomeModule
      ),
    canActivate: [IsSignedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
