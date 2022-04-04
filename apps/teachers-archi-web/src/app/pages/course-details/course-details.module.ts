import { NgModule } from '@angular/core';
import { UiModule } from '@teachers-archi-web/ui';
import { CourseDetailsComponent } from './course-details.component';
import { CoursesDetailsModule } from './course-details-routing.module';

@NgModule({
  imports: [CoursesDetailsModule, UiModule],

  declarations: [CourseDetailsComponent],
  exports: [CourseDetailsComponent],
})
export class CourseDetailsModule {}
