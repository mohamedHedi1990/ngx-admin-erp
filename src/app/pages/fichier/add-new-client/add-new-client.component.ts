import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.scss'],
})
export class AddNewClientComponent implements OnInit {
  client = {
    customerId: null,
    customerLabel: '',
    customerAddress: '',
    customerUniqueIdentifier: '',
    customerManagerName: '',
    customerTel: '',
    customerEmail: '',
    customerContacts: null,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
