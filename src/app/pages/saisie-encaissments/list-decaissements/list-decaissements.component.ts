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
  displayValidateDecaissement = false;
  displayDeleteDecaissement = false;
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
    this.decaissments = [
      {
        decaissementId: 1,
      decaissementType: {
        decaissementTypeValue: 'PAIEMENT_FACTURE_FOURNISSEUR',
        decaissementTypeLabel: 'Paiement facture fournisseur'
      },
      decaissementDeadlineDate : '2020-10-10',
      decaissementPaymentType: 'CHEQUE',
      decaissementPaymentRuleNumber: '000000123',
      decaissementPaymentRuleDetails: null,
      decaissementAmount : 1300,
      decaissementAmountS : '1300.000',
      decaissementCurrency : 'TND',
      decaissementLabel: 'Decaissement de la facture fournissuer numéro REF123',
      decaissementDetails : 'Décaissement fait par notre agence commercial pour régler cette facture avant la date de fin',
      decaissementInvoice : {
        invoiceId: 1,
	invoiceCurrency: 'TND',
    invoiceNumber: 'REF123',
      },
      decaissementBankAccount : {
        accountId: 1,
        accountLabel : 'Compte courant BIATmmmm',
        accountBank: 'BIAT',
        accountBankAdress : 'LAC 2',
        accountAgency: 'BIAT LAC 2',
        accountAgencyAdress: '',
        accountChargeCustomerName: '',
        accountChargeCustomerPhoneNumber: '',
        accountChargeCustomerEmail: '',
        accountNumber: 'M4123456789',
        accountRIB: '',
        accountCurrency: '',
        accountContacts: [],
      },
      decaissementProvider:  {
        providerId: 1,
    providerLabel: 'BI SERVICES',
    providerAddress: '',
    providerUniqueIdentifier: 'BI S RF 12OPL - KL2',
    providerManagerName: '',
    providerTel: '',
    providerEmail: '',
    providerContacts: [],
      },
      isValidated: false,
      }
    ];
    /*const context = this;
    this.UtilsService.get(UtilsServiceService.API_DECAISSEMENT).subscribe( response => {
        context.decaissments = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement de la liste des décaissements`);
      });*/
  }

  editDecaissement(decaissement) {
    this.decaissement = decaissement;
    this.showDecaissementWindow = true;
  }

  delDecaissement() {
    const context = this;
    const url = UtilsServiceService.API_DECAISSEMENT + '/' + this.decaissement.decaissementId;
    this.UtilsService.delete(url).subscribe( response => {
        this.UtilsService.showToast('success',
          'Décaissement supprimé avec succés',
          `Le décaissement  ${this.decaissement.decaissementLabel} a été supprimé avec succcés`);
          this.displayDeleteDecaissement = false;
        context.getAllDecaissements();
        this.initDecaissement();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du décaissement  ${this.decaissement.decaissementLabel}`);
      });


  }

  deleteDecaissement(decaissement) {
    this.displayDeleteDecaissement = true;
    this.decaissement = decaissement;
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

  showValidateDecaisementWindow(decaissement) {
    this.displayValidateDecaissement = true;
    this.decaissement = decaissement;
  }

  validateDecaissement()  {
	  const context = this;
    this.UtilsService.put(UtilsServiceService.API_DECAISSEMENT + '/' + this.decaissement.decaissementId, null).subscribe( response => {

      this.UtilsService.showToast('success',
      'Décaissement validé avec succés',
      `Le décaissement ${this.decaissement.decaissementLabel} a été validé avec succés`);
      this.displayValidateDecaissement = false;
       context.getAllDecaissements();
	   this.initDecaissement();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la validation du décaissement ${this.decaissement.decaissementLabel}`);
        this.displayValidateDecaissement = false;
		this.initDecaissement();
    });


  }
}
