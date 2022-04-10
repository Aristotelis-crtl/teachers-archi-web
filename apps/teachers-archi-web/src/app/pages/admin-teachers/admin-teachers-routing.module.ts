import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminTeachersComponent } from './admin-teachers.component';

const routes: Routes = [{ path: '', component: AdminTeachersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTeachersRoutingModule {}
