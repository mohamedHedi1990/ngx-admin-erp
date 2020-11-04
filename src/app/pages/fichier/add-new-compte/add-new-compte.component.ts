
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-add-new-compte',
  templateUrl: './add-new-compte.component.html',
  styleUrls: ['./add-new-compte.component.scss'],
})
export class AddNewCompteComponent implements OnInit {


  @Input() account = {
    accountId: null,
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
    accountContacts: [],
    accountInitialAmount: null,
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
  checkAccountValid (): boolean {
    return this.account.accountAgency == null || this.account.accountAgency === '' ||
    this.account.accountBank == null || this.account.accountBank === '' ||
      this.account.accountCurrency == null || this.account.accountCurrency === '' ||
      this.account.accountNumber == null || this.account.accountNumber === '' ||
      this.account.accountRIB == null || this.account.accountRIB === '' ||
      this.account.accountLabel == null || this.account.accountLabel === '';
  }
  saveAccount() {
    this.addNewAccountEvent.emit(this.account);
  }

  cancel() {
    this.cancelEvent.emit();
  }


}
