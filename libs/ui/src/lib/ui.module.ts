import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
  
    TeachersComponent
  ],
  exports: [
  
    TeachersComponent
  ]
})
export class UiModule {}
