import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-global-supervision',
  templateUrl: './global-supervision.component.html',
  styleUrls: ['./global-supervision.component.scss']
})
export class GlobalSupervisionComponent implements OnInit {
  operations = [];
  constructor() { }

  ngOnInit(): void {
  }

}
