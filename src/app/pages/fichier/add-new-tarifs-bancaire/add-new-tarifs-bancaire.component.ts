import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-add-new-tarifs-bancaire',
  templateUrl: './add-new-tarifs-bancaire.component.html',
  styleUrls: ['./add-new-tarifs-bancaire.component.scss'],
})
export class AddNewTarifsBancaireComponent implements OnInit {
@Input() tarif = {tarifId: null, tarifLabel: '', tarifAccount: null, comissions: []};
  @Output() addNewTarifEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor(private UtilsService: UtilsServiceService) { }
  accounts = [];
  ngOnInit(): void {
    this.getAllAccounts();
  }
  saveTarif() {
    this.addNewTarifEvent.emit(this.tarif);
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
    this.tarif.comissions.push({
      comissionLabel : '',
      comissionOperation: null,
      comissionValue: 0,
      commissionType: null,
    });
  }
  checkTarifValid(): boolean {
    return this.tarif.tarifAccount == null || this.tarif.tarifLabel == null || this.tarif.tarifLabel === '';
  }
}
