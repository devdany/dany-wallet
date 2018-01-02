import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {InfoComponent} from './info/info.component';
import {TransferComponent} from './transfer/transfer.component';
import {AuthService} from '../core/shared/auth.service';
import {SharedModule} from '../shared/shared.module';
import {Web3Service} from '../core/shared/web3.service';
import { AddTokenComponent } from './add-token/add-token.component';
import {JsonpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    InfoComponent,
    TransferComponent,
    AddTokenComponent
  ],
  exports: [
    HomeComponent,
    InfoComponent,
    TransferComponent
  ],
  providers: [
    AuthService,
    Web3Service
  ]
})
export class FeatureModule { }
