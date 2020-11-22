import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-add-new-tarifs-bancaire',
  templateUrl: './add-new-tarifs-bancaire.component.html',
  styleUrls: ['./add-new-tarifs-bancaire.component.scss'],
})
export class AddNewTarifsBancaireComponent implements OnInit {
  @Output() addNewTarifEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
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
    accountComissions: [],
    createdAt: null,
    updatedAt: null,
  };
  constructor(private UtilsService: UtilsServiceService) { }
  accounts: any[] = [];
  ngOnInit(): void {
    this.getAllAccounts();
  }
  saveTarif() {
    this.addNewTarifEvent.emit(this.account);
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
  cancel() {
    this.cancelEvent.emit();
  }
/*
  onChangeCompteLabel() {
    this.tarif.tarifAccount.accountCurrency = this.tarif.tarifAccount.accountCurrency;
    this.tarif.tarifAccount.accountNumber = this.tarif.tarifAccount.accountNumber;
  }*/
  addNewComission() {
    this.account.accountComissions.push({
      comissionLabel : '',
      comissionOperation: null,
      comissionValue: 0,
      commissionType: null,
    });
  }

  disabelAddComissionButton(): boolean {
    for (const comission of this.account.accountComissions) {
      if (comission.comissionLabel == null || comission.comissionOperation == null || comission.comissionValue == null || comission.commissionType == null ||
        comission.comissionLabel === '' || comission.comissionOperation === '' || comission.comissionValue === '' || comission.commissionType === '') {
        return true;
      }
    }
    return false;
      }
}
