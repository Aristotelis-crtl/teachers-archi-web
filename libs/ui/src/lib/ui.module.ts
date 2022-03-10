import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import {HttpClientModule} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
//import { registerLocaleData } from '@angular/common';
//import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzButtonModule} from 'ng-zorro-antd/button'
import {  } from '@angular/platform-browser';
@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, NzLayoutModule, NzMenuModule, NzButtonModule],
  declarations: [
    TeachersComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  exports: [
    TeachersComponent
  ]
})
export class UiModule {}
