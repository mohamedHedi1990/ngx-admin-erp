import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-list-comptes',
  templateUrl: './list-comptes.component.html',
  styleUrls: ['./list-comptes.component.scss'],
})
export class ListComptesComponent implements OnInit {
  accounts: any[];
  loading = false;
  ngOnInit(): void {
    this.accounts = [
      {accountLabel: 'Compte BNA A', accountBankAdress: 'LAC 2 Tunis', accountBank: 'compte BNA', accountAgency: 'Agence BNA LAC2', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '1', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '24852202' , createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Compte Biat B', accountBankAdress: 'MontPlaisir Tunis', accountBank: 'compte STB', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '2', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '54484555', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client STB C', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'compte BIAT', accountAgency: 'Agence STB MontPlaisir', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '3', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '95412058' , createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat D', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'compte BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1' , accountChargeCustomerPhoneNumber: '21212325', accountNumber: '4', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '43214148', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat E', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'compte BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1' , accountChargeCustomerPhoneNumber: '21212325', accountNumber: '5', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '45812103', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat F', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'compte BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1' , accountChargeCustomerPhoneNumber: '21212325', accountNumber: '6', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '55111222', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat G', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'compte BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '7', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '21351048' , createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},

    ];
  }


}
