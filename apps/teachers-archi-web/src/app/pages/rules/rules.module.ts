import { NgModule } from '@angular/core';
import { UiModule } from '@teachers-archi-web/ui';
import { AdminRulesRoutingModule } from './rules-routing.module';
import { AdminRulesComponent } from './rules.component';

@NgModule({
  imports: [AdminRulesRoutingModule, UiModule],

  declarations: [AdminRulesComponent],
  exports: [AdminRulesComponent],
})
export class AdminRulesModule {}
