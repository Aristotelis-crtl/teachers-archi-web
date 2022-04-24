import { NgModule } from '@angular/core';

import { AdminHomeRoutingModule } from './admin-home-routing.module';

import { AdminHomeComponent } from './admin-home.component';

import { UiModule } from '@teachers-archi-web/ui';

@NgModule({
  imports: [AdminHomeRoutingModule, UiModule],
  declarations: [AdminHomeComponent],
  exports: [AdminHomeComponent],
})
export class AdminHomeModule {}
