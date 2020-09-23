import { Component, OnInit } from '@angular/core';
import {SmartTableData} from '../../../@core/data/smart-table';
import {UtilsServiceService} from '../../../utils-service.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ListContactsComponent} from '../list-contacts/list-contacts.component';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'ngx-list-comptes',
  templateUrl: './list-comptes.component.html',
  styleUrls: ['./list-comptes.component.scss'],
  providers: [DialogService],
})
export class ListComptesComponent implements OnInit {
  accounts: any[];
  showAccountWindow = false;
  loading = false;
  account = null;
  showContactList = false;
  contactModalheader = 'List des contacts ';

  ngOnInit(): void {
    this.initAccount();
    /*
    this.accounts = [
      {accountLabel: 'Compte BNA A', accountBankAdress: 'LAC 2 Tunis', accountBank: 'BNA', accountAgency: 'Agence BNA LAC2', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '1', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '24852202' , createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Compte Biat B', accountBankAdress: 'MontPlaisir Tunis', accountBank: 'STB', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '2', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '54484555', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client STB C', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'BIAT', accountAgency: 'Agence STB MontPlaisir', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '3', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '95412058' , createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat D', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1' , accountChargeCustomerPhoneNumber: '21212325', accountNumber: '4', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '43214148', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat E', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1' , accountChargeCustomerPhoneNumber: '21212325', accountNumber: '5', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '45812103', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat F', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1' , accountChargeCustomerPhoneNumber: '21212325', accountNumber: '6', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '55111222', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {accountLabel: 'Client Biat G', accountBankAdress: 'Jardins de l\'aouina 2046 Tunis', accountBank: 'BIAT', accountAgency: 'Agence BIAT LAC1', accountAgencyAdress: 'Jardins de l\'aouina 2046 Tunis' , accountChargeCustomerName: 'client1', accountChargeCustomerPhoneNumber: '21212325', accountNumber: '7', accountRIB: '00214845259958', accountCurrency: 'DT', accountContacts : '21351048' , createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},

    ];*/
    this.getAllAccounts();
  }
  constructor(private service: SmartTableData, private UtilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) {
    // const data = this.service.getData();
    //  this.source.load(data);
  }

  saveNewAccount() {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_ACCOUNT, this.account).subscribe( response => {
        this.hideAccountWindow();
        if ( context.account.accountId == null) {
          this.UtilsService.showToast('success',
            'Compte ajouté avec succés',
            `Le compte  ${this.account.accountLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Compte modfié avec succés',
            `Le compte  ${this.account.accountLabel} a été modifié avec succcés`);
        }
        context.getAllAccounts();
        context.initAccount();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde du compte ${this.account.accountLabel}`); });

  }

  getAllAccounts() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des comptes`);
      });

  }
  editAccount(account) {
    this.account = account;
    this.showAccountWindow = true;
  }
  deleteAccount(account) {
    this.confirmationService.confirm({
      message: `Voulez vous vraiment supprimer le compte bancaire ${account.accountLabel}?`,
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      header: `Supprimer un compte bancaire`,
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delAccount(account);
      },
    });

  }
  delAccount(account) {
    const context = this;
    this.UtilsService.delete(`${UtilsServiceService.API_ACCOUNT}/${account.accountId}`).subscribe( response => {
        context.accounts = response;
        this.UtilsService.showToast('success',
          'Compte supprimé avec succés',
          `Le compte  ${account.accountLabel} a été supprimé avec succcés`);
        this.initAccount();
        this.getAllAccounts();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du compte ${account.accountLabel}. \n Verifiez s'il existe d'autres données reliées à ce compte bancaire avant de le supprimer!`);
        this.initAccount();
    this.getAllAccounts(); });



  }

  hideAccountWindow() {
    this.showAccountWindow = false;
  }

  initAccount() {
    this.account = {
      accountId: null,
        accountLabel : '',
        accountBank: '',
        accountBankAdress : '',
        accountAgency: '',
        accountAgencyAdress: '',
        accountChargeCustomerName: '',
        accountChargeCustomerPhoneNumber: '',
        accountNumber: '',
        accountRIB: '',
        accountCurrency: '',
        accountContacts: [],
    };
  }

  showContacts(account) {
    this.contactModalheader = this.contactModalheader + account.accountLabel;
    const ref = this.dialogService.open(ListContactsComponent, {
      data: {
        contacts: account.accountContacts,
      },
      header: this.contactModalheader,
      width: '70%',
    });
  }

}
