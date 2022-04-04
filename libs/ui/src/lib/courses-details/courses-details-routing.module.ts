import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesDetailsComponent } from './courses-details.component';
const routes: Routes = [{ path: '', component: CoursesDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
