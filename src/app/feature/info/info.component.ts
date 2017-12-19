import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'dw-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  isOpen = false;
  constructor() { }

  ngOnInit() {
  }

  infoOpen() {
    this.isOpen = true;
  }
  infoClose() {
    this.isOpen = false;
  }
}
