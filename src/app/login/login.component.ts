import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  loginOpen() {
    this.isOpen = true;
  }
  loginClose() {
    this.isOpen = false;
  }

}
