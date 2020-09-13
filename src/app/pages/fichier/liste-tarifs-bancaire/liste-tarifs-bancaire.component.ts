import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-liste-tarifs-bancaire',
  templateUrl: './liste-tarifs-bancaire.component.html',
  styleUrls: ['./liste-tarifs-bancaire.component.scss'],
})
export class ListeTarifsBancaireComponent implements OnInit {
  showAccountWindow = false;
  tarifs = [];
  loading = false;
  tarif = {
    tarifLabel: '',
    tarifAccount: null,

  };
  constructor() { }

  ngOnInit(): void {
    this.tarifs = [
      {tarifLabel: 'Tarifs BIAT', check_remittance_commission: 1, remittance_of_bills_for_collection_commission: 2.900, discount_commission: 2.300,
        transfer_commission: '1.500', interest_rate: '23%', tarifAccount: {accountLabel: 'compte courant BIAT',
          accountNumber: 'MOP98760JN'}},
    ];
  }

}
