import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-nouveau-decaissement',
  templateUrl: './nouveau-decaissement.component.html',
  styleUrls: ['./nouveau-decaissement.component.scss']
})
export class NouveauDecaissementComponent implements OnInit {
  @Input() decaissement = {
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
  @Output() addNewDecaissementEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  accounts = [];
  decaissementTypes = [];
  invoices = [];

  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.getAllAccounts();
    this.getAllInvoiceProviders();
    this.getAllTypesDEcaissements();
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

  getAllInvoiceProviders() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER_INVOICE).subscribe( response => {
        context.invoices = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des factures fournissuers`);
      });

  }

  getAllTypesDEcaissements() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_TYPE_DECAISSEMENT).subscribe( response => {
        context.decaissementTypes = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des types des décaissements`);
      });

  }

  saveDecaissement(){

    this.addNewDecaissementEvent.emit(this.decaissement);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkDecaissementValid(): boolean {
    return this.decaissement.decaissementType == null || this.decaissement.decaissementDeadlineDate === '' &&
      this.decaissement.decaissementPaymentType == null || this.decaissement.decaissementPaymentRuleNumber === ''
      || this.decaissement.decaissementAmount === null
      || this.decaissement.decaissementLabel === null
      || this.decaissement.decaissementBankAccount === null
      || (this.decaissement.decaissementInvoice === null && this.decaissement.decaissementType.decaissementType ===
        'PAIEMENT_FACTURE_FOURNISSEUR');
  }
}
