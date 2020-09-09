import { Component, OnInit } from '@angular/core';
import {SmartTableData} from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss'],
})
export class ListContactsComponent implements OnInit {

  constructor(private service: SmartTableData) {

  }


  ngOnInit(): void {

  }

}
