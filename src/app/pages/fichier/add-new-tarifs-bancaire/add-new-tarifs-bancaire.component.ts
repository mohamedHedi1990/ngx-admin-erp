import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-add-new-tarifs-bancaire',
  templateUrl: './add-new-tarifs-bancaire.component.html',
  styleUrls: ['./add-new-tarifs-bancaire.component.scss'],
})
export class AddNewTarifsBancaireComponent implements OnInit {
@Input() tarif = {tarifLabel: '', tarifAccount: {accountLabel: null,
    accountNumber: '', accountCurrency: ''}, comissions: []};
  @Output() addNewTarifEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  saveTarif() {
    this.addNewTarifEvent.emit(this.tarif);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  onChangeCompteLabel() {
    this.tarif.tarifAccount.accountCurrency = 'TND';
    this.tarif.tarifAccount.accountNumber = '12345TYU7';
  }
  addNewComission() {
    this.tarif.comissions.push({
      comissionLabel : '',
      comissionOperation: null,
      comissionValue: 0,
      commissionType: null,
    });
  }
}
