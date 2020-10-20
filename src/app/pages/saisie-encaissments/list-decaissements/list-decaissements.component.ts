import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'ngx-list-decaissements',
  templateUrl: './list-decaissements.component.html',
  styleUrls: ['./list-decaissements.component.scss'],
})
export class ListDecaissementsComponent implements OnInit {

  showDecaissementWindow = false;
  decaissments = [];
  loading = false;
  decaissement = null;
  constructor(private UtilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initDecaissement();
    this.getAllDecaissements();
  }
  saveDecaissement(decaissement) {
    console.log('--------------------------------------------------------------- ', decaissement);

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_DECAISSEMENT, decaissement).subscribe( response => {
        this.hideDecaissementWindow();
        if ( decaissement.decaissementId == null) {
          this.UtilsService.showToast('success',
            'Décaissement ajouté avec succés',
            `Le décaissement  ${decaissement.decaissementLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Décaissement modfié avec succés',
            `Le décaissement ${decaissement.decaissementLabel} a été modifié avec succcés`);
        }
        context.getAllDecaissements();
        context.initDecaissement();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de l'enregistrement du décaissement  ${decaissement.decaissementLabel}`); });

  }
  hideDecaissementWindow() {
    this.showDecaissementWindow = false;
    this.initDecaissement();
  }

  getAllDecaissements() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_DECAISSEMENT).subscribe( response => {
        context.decaissments = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement de la liste des décaissements`);
      });
  }

  editDecaissement(decaissement) {
    this.decaissement = decaissement;
    this.showDecaissementWindow = true;
  }

  delDecaissement(decaissement) {
    const context = this;
    const url = UtilsServiceService.API_DECAISSEMENT + '/' + decaissement.decaissementId;
    this.UtilsService.delete(url).subscribe( response => {
        this.UtilsService.showToast('success',
          'Décaissement supprimé avec succés',
          `Le décaissement  ${decaissement.decaissementLabel} a été supprimé avec succcés`);
        context.getAllDecaissements();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du décaissement  ${decaissement.decaissementLabel}`);
      });


  }

  deleteDecaissement(decaissement) {
    this.confirmationService.confirm({
      message: `Voulez vous vraiment supprimer le décaissement  ${decaissement.decaissementLabel}?`,
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      header: `Supprimer un décaissement `,
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delDecaissement(decaissement);
      },
    });
  }
  initDecaissement() {
    this.decaissement = {
      decaissementId: null,
    decaissementType: null,
    decaissementDeadlineDate : null,
    decaissementPaymentType: null,
    decaissementPaymentRuleNumber: null,
    decaissementPaymentRuleDetails: null,
    decaissementAmount : null,
    decaissementLabel: null,
    decaissementDetails : null,
    decaissementInvoice : null,
    decaissementBankAccount : null,

    };
  }

}
