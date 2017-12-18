import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'dw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen = true;
  constructor(@Inject(DOCUMENT) private doc: Document) { }

  ngOnInit() {
  }

  homeOpen() {
    this.isOpen = true;
  }
  homeClose() {
    this.isOpen = false;
  }

}
