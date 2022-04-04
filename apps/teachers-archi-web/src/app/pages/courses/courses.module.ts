import { NgModule } from '@angular/core';

import { UiModule } from '@teachers-archi-web/ui';
import { CoursesRoutingModule } from './courses-routing.module';
import { Courses2Component } from './courses.component';

@NgModule({
  imports: [CoursesRoutingModule, UiModule],
  declarations: [Courses2Component],
  exports: [Courses2Component],
})
export class CoursesModule {}
