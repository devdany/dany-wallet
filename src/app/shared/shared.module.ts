import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgSelectModule.forRoot()
  ],
  declarations: [],
  exports: [ModalModule, FormsModule]
})
export class SharedModule { }
