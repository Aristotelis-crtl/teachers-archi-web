import { NgModule } from '@angular/core';
import { UiModule } from '@teachers-archi-web/ui';
import { AdminEditRoutingModule } from './admin-edit-routing.module';
import { AdminEditComponent } from './admin-edit.component';

@NgModule({
  imports: [AdminEditRoutingModule, UiModule],

  declarations: [AdminEditComponent],
  exports: [AdminEditComponent],
})
export class AdminEditModule {}
