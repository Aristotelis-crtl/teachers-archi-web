import { NgModule } from '@angular/core';

import { ProfileDetailsRouting } from './profile-details-routing.module';

import { UiModule } from '@teachers-archi-web/ui';
import { ProfileDetailsComponent } from './profile-details.component';

@NgModule({
  imports: [ProfileDetailsRouting, UiModule],
  declarations: [ProfileDetailsComponent],
  exports: [ProfileDetailsComponent],
})
export class ProfileDetailsModule {}
