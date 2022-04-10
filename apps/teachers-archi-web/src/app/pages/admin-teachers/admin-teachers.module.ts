import { NgModule } from '@angular/core';

import { AdminTeachersRoutingModule } from './admin-teachers-routing.module';

import { AdminTeachersComponent } from './admin-teachers.component';

import { UiModule } from '@teachers-archi-web/ui';

@NgModule({
  imports: [AdminTeachersRoutingModule, UiModule],
  declarations: [AdminTeachersComponent],
  exports: [AdminTeachersComponent],
})
export class AdminTeachersModule {}
