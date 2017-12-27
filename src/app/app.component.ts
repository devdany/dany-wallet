import { Component } from '@angular/core';
import { BsModalService} from 'ngx-bootstrap';
import {SignupComponent} from './core/signup/signup.component';
import {AddTokenComponent} from "./feature/add-token/add-token.component";



@Component({
  selector: 'dw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dw';
  constructor(private bsModal: BsModalService) {}

  signUp() {
    this.bsModal.config.class = 'signup';
    this.bsModal.show(SignupComponent);
  }

  addToken() {
    this.bsModal.config.class = 'addToken';
    this.bsModal.show(AddTokenComponent);
  }

}
