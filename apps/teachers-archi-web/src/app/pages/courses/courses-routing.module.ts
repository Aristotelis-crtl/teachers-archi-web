import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Courses2Component } from './courses.component';

const routes: Routes = [{ path: '', component: Courses2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
