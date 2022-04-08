import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersUesComponent } from './teachers-ues.component';
const routes: Routes = [{ path: '', component: TeachersUesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
