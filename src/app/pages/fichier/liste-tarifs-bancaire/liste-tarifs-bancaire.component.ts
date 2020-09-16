import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-liste-tarifs-bancaire',
  templateUrl: './liste-tarifs-bancaire.component.html',
  styleUrls: ['./liste-tarifs-bancaire.component.scss'],
})
export class ListeTarifsBancaireComponent implements OnInit {
  showAccountWindow = false;
  tarifs = [];
  loading = false;
  tarif = {tarifLabel: '', check_remittance_commission: 0, remittance_of_bills_for_collection_commission: 0, discount_commission: 0,
    transfer_commission: 0, interest_rate: 0, tarifAccount: {accountLabel: '',
      accountNumber: '', accountCurrency: ''}};
  showTarifBancaireWindow = false;
  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
  }

  saveNewTarif(tarif) {
    this.hideTarifBancaireWindow();
    this.tarifs.push(tarif);
    this.UtilsService.showToast('success',
      'Tarifs bancaires ajoutés avec succés',
      `La configuration  ${tarif.tarifLabel} a été ajoutée avec succcés`);
    this.initTarifBancaire();
  }

  hideTarifBancaireWindow() {
    this.showTarifBancaireWindow = false;
  }

  initTarifBancaire() {
    this.tarif = {tarifLabel: '', check_remittance_commission: 0, remittance_of_bills_for_collection_commission: 0, discount_commission: 0,
      transfer_commission: 0, interest_rate: 0, tarifAccount: {accountLabel: '',
        accountNumber: '', accountCurrency: ''}};
  }

  editTarif(tarif) {
    this.tarif = tarif;
    this.showTarifBancaireWindow = true;
  }

}
