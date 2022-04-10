import { NgModule } from '@angular/core';

import { UiModule } from '@teachers-archi-web/ui';
import { UesLeftRoutingModule } from './ues-left-routing.module';
import { UesLeftComponent } from './ues-left.component';

@NgModule({
  imports: [UesLeftRoutingModule, UiModule],
  declarations: [UesLeftComponent],
  exports: [UesLeftComponent],
})
export class UesLeftModule {}
