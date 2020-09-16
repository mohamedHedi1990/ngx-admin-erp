
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-add-new-compte',
  templateUrl: './add-new-compte.component.html',
  styleUrls: ['./add-new-compte.component.scss']
})
export class AddNewCompteComponent implements OnInit {


  @Input() account = {
    accountLabel : '',
    accountBank: '',
    accountBankAdress : '',
    accountAgency: '',
    accountAgencyAdress: '',
    accountChargeCustomerName: '',
    accountChargeCustomerPhoneNumber: '',
    accountChargeCustomerEmail: '',
    accountNumber: '',
    accountRIB: '',
    accountCurrency: '',
    accountContacts: []
  };
  @Output() addNewAccountEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  addNewContact() {
    this.account.accountContacts.push({
      contactName : '',
      contactPost : '',
      contactTel : '',
      contactEmail : '',
    });
  }
  saveAccount() {
    this.addNewAccountEvent.emit(this.account);
  }

  cancel() {
    this.cancelEvent.emit();
  }


}
