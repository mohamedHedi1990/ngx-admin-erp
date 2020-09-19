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
  tarif = {tarifId: null, tarifLabel: '', tarifAccount: {accountLabel: '',
      accountNumber: '', accountCurrency: ''}, comissions: []};
  showTarifBancaireWindow = false;
  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.getAllTarifs();
  }

  hideTarifBancaireWindow() {
    this.showTarifBancaireWindow = false;
  }

  initTarifBancaire() {
    this.tarif = {tarifId: null, tarifLabel: '',  tarifAccount: {accountLabel: '',
        accountNumber: '', accountCurrency: ''}, comissions: []};
  }

  editTarif(tarif) {
    this.tarif = tarif;
    this.showTarifBancaireWindow = true;
  }

  saveNewTarif(tarif) {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_TARIF, this.tarif).subscribe( response => {
        this.hideTarifBancaireWindow();
        if ( context.tarif.tarifId == null) {
          this.UtilsService.showToast('success',
            'Tarification bancaire ajoutée avec succés',
            `La tarification  ${this.tarif.tarifLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Tarification bancaire modifiée avec succés',
            `La tarification  ${this.tarif.tarifLabel} a été modifiée avec succcés`);
        }
        context.getAllTarifs();
        context.initTarifBancaire();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde de la tarification ${this.tarif.tarifLabel}`); });

  }

  getAllTarifs() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_TARIF).subscribe( response => {
        context.tarifs = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des tarifications bancaires`);
      });

  }
  deleteTarif(tarif) {
    const context = this;
    this.UtilsService.delete(`${UtilsServiceService.API_TARIF}/${tarif.tarifId}`).subscribe( response => {
        context.tarifs = response;
        this.UtilsService.showToast('success',
          'Tarification bancaire supprimée avec succés',
          `La tarification bancaire  ${tarif.tarifLabel} a été supprimée avec succcés`);
        this.initTarifBancaire();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression de la tarification bancaire ${tarif.tarifLabel}`);
        this.initTarifBancaire(); });



  }

}
