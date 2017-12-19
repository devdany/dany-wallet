import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {InfoComponent} from './info/info.component';
import {TransferComponent} from './transfer/transfer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeComponent,
    InfoComponent,
    TransferComponent
  ],
  exports: [
    HomeComponent,
    InfoComponent,
    TransferComponent
  ]
})
export class FeatureModule { }
