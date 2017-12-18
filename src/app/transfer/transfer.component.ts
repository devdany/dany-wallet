import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dw-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }
  transferOpen() {
    this.isOpen = true;
  }
  transferClose() {
    this.isOpen = false;
  }

}
