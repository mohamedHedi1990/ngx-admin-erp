import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-add-new-facture-client',
  templateUrl: './add-new-facture-client.component.html',
  styleUrls: ['./add-new-facture-client.component.scss'],
})
export class AddNewFactureClientComponent implements OnInit {
  @Input() customer = {
    invoiceNumber: '',
    invoiceCustomer: '',
    invoiceDate: '',
    invoiceDeadlineDate: '',
    invoiceNet: '',
    invoiceRs: '',
    invoiceRsType: '',
    invoiceTotalAmount: '',

  };
  @Output() addNewCustomerEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  saveCustomer() {
    this.addNewCustomerEvent.emit(this.customer);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkCustomerValid(): boolean {
    return this.customer.invoiceNumber == null || this.customer.invoiceNumber === '' &&
      this.customer.invoiceCustomer == null || this.customer.invoiceCustomer === '';
  }
}
