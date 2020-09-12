import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.scss'],
})
export class AddNewClientComponent implements OnInit {
  @Input() client = {
    customerId: null,
    customerLabel: '',
    customerAddress: '',
    customerUniqueIdentifier: '',
    customerManagerName: '',
    customerTel: '',
    customerEmail: '',
    customerContacts: [],
  };
  @Output() addNewClientEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  addNewContact() {
    this.client.customerContacts.push({
      contactName : '',
      contactPost : '',
      contactTel : '',
      contactEmail : '',
    });
  }
  saveClient() {
    this.addNewClientEvent.emit(this.client);
  }

  cancel() {
    this.cancelEvent.emit();
  }

}
