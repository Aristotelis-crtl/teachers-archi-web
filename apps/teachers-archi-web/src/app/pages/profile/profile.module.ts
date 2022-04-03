import { NgModule } from '@angular/core';
import { UiModule } from '@teachers-archi-web/ui';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ ProfileRoutingModule,UiModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule { }
