import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrls: ['./card-element.component.css']
})
export class CardElementComponent implements OnInit {
  public title = 'none';
  constructor() { }

  ngOnInit() {
  }

}
