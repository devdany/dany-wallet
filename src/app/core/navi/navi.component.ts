import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'dw-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output()
  openCreateClick = new EventEmitter();

  @Output()
  openInfoClick = new EventEmitter();

  @Output()
  openHomeClick = new EventEmitter();

  @Output()
  openTransferClick = new EventEmitter();

  @Output()
  openLoginClick = new EventEmitter();

  openCreate() {
    this.openCreateClick.emit();
  }

  openInfo() {
    this.openInfoClick.emit();
  }

  openHome() {
    this.openHomeClick.emit();
  }

  openTransfer() {
    this.openTransferClick.emit();
  }

  openLogin() {
    this.openLoginClick.emit();
  }
}
