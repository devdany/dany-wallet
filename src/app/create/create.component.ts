import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import Web3 from 'web3';

@Component({
  selector: 'dw-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isOpen = false;
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

  }

}
