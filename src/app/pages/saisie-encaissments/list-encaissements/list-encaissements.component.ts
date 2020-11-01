import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-list-encaissements',
  templateUrl: './list-encaissements.component.html',
  styleUrls: ['./list-encaissements.component.scss']
})
export class ListEncaissementsComponent implements OnInit {
  showEncaissementWindow = false;
  encaissements = [];
  encaissement = null;
  displayValidateEncaissement = false;
  displayDeleteEncaissement = false;
  constructor(private UtilsService: UtilsServiceService,
    public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initEncaissement();
    this.getAllEncaissements();
  }
  
  editEncaissement(encaissement) {
    this.encaissement = encaissement;
    this.showEncaissementWindow = true;
  }
  delEncaissement() {
    const context = this;
    const url = UtilsServiceService.API_ENCAISSEMENT + '/' + this.encaissement.encaissementId;
    this.UtilsService.delete(url).subscribe( response => {
        this.UtilsService.showToast('success',
          'Décaissement supprimé avec succés',
          `Le décaissement  ${this.encaissement.encaissementLabel} a été supprimé avec succcés`);
          this.displayDeleteEncaissement = false;
        context.getAllEncaissements();
        this.initEncaissement();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du décaissement  ${this.encaissement.encaissementLabel}`);
      });

  }
  deleteEncaissement(encaissement) {
    this.displayDeleteEncaissement = true;
    this.encaissement = encaissement;
  }
  saveEncaissement(encaissement) {
 const context = this;
    this.UtilsService.post(UtilsServiceService.API_ENCAISSEMENT, encaissement).subscribe( response => {
        this.hideEncaissementWindow();
        if ( encaissement.encaissementId == null) {
          this.UtilsService.showToast('success',
            'Encaissement ajouté avec succés',
            `L'encaissement  ${encaissement.encaissementLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Encaissement modfié avec succés',
            `L'encaissement ${encaissement.encaissementLabel} a été modifié avec succcés`);
        }
        context.getAllEncaissements();
        context.initEncaissement();
         this.showEncaissementWindow = false;
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de l'enregistrement de l'encaissement  ${encaissement.encaissementLabel}`);
        }); 
  }
  getAllEncaissements() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ENCAISSEMENT).subscribe( response => {
        context.encaissements = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement de la liste des encaissements`);
      });
  }
  hideEncaissementWindow() {
    this.showEncaissementWindow = false;
    this.initEncaissement();
  }
  
  initEncaissement() {
    this.encaissement = {
      encaissementId: null,
    encaissementType: null,
    encaissementDeadlineDate : null,
    encaissementPaymentType: null,
    encaissementPaymentRuleNumber: null,
    encaissementPaymentRuleDetails: null,
    encaissementAmount : null,
    encaissementLabel: null,
    encaissementDetails : null,
    encaissementInvoice : null,
    encaissementBankAccount : null,
    encaissementChequeImpaye: null,
    encaissementCurrency: 'TND',

    };
  }
  showValidateEncaissementWindow(encaissement) {
    this.displayValidateEncaissement = true;
    this.encaissement = encaissement;
  }

  validateEncaissement()  {
	  const context = this;
    this.UtilsService.put(UtilsServiceService.API_DECAISSEMENT + '/' + this.encaissement.encaissementId, null).subscribe( response => {

      this.UtilsService.showToast('success',
      'Décaissement validé avec succés',
      `Le décaissement ${this.encaissement.encaissementLabel} a été validé avec succés`);
      this.displayValidateEncaissement = false;
       context.getAllEncaissements();
	   this.initEncaissement();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la validation du décaissement ${this.encaissement.encaissementLabel}`);
        this.displayValidateEncaissement = false;
		this.initEncaissement();
    });


  }
}
