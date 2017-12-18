import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import Web3 from 'web3';
import $ from 'jquery';

@Component({
  selector: 'dw-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isOpen = false;
  web3 = new Web3('http://localhost:8545');
  constructor(@Inject(DOCUMENT) private doc: Document) {}
  ngOnInit() {
  }
  createOpen() {
    this.isOpen = true;
  }
  createClose() {
    this.isOpen = false;
  }
  createAccount() {
    const password = $('#password').val();
    this.web3.eth.personal.newAccount(password).then(console.log);
  }

}
