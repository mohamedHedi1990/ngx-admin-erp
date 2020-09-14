import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-add-new-tarifs-bancaire',
  templateUrl: './add-new-tarifs-bancaire.component.html',
  styleUrls: ['./add-new-tarifs-bancaire.component.scss'],
})
export class AddNewTarifsBancaireComponent implements OnInit {
@Input() tarif = {tarifLabel: '', check_remittance_commission: 0, remittance_of_bills_for_collection_commission: 0, discount_commission: 0,
  transfer_commission: 0, interest_rate: 0, tarifAccount: {accountLabel: null,
    accountNumber: '', accountCurrency: ''}};
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

}
