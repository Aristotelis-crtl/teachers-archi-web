import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRulesComponent } from './rules.component';

const routes: Routes = [{ path: '', component: AdminRulesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRulesRoutingModule {}
