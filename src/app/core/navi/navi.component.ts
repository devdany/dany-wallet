import {Component, ElementRef, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'dw-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  email: string
  constructor(private el: ElementRef, @Inject(DOCUMENT) private doc: Document, private auth: AuthService) {
    auth.token.subscribe(user => {
      if (user) {
        console.log(user.email);
        this.email = user.email;
      } else {
        this.email = undefined;
      }
    });
  }

  ngOnInit() {
  }

  @Output()
  openInfoClick = new EventEmitter();

  @Output()
  openHomeClick = new EventEmitter();

  @Output()
  openTransferClick = new EventEmitter();

  @Output()
  onSignupClick = new EventEmitter();

  @Output()
  onLoginClick = new EventEmitter();

  openInfo() {
    this.openInfoClick.emit();
  }

  openHome() {
    this.openHomeClick.emit();
  }

  openTransfer() {
    this.openTransferClick.emit();
  }

}
