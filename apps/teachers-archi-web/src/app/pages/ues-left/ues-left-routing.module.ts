import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UesLeftComponent } from './ues-left.component';

const routes: Routes = [{ path: '', component: UesLeftComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UesLeftRoutingModule {}
