import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaviComponent } from './navi/navi.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NaviComponent],
  exports: [NaviComponent]
})
export class CoreModule { }
