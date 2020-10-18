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
    decaissementProvider: null,
  };
  @Output() addNewDecaissementEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  accounts = [];
  decaissementTypes = [];
  invoices = [];
  providers = [];

  decaissementType = {
    decaissementTypeId: null,
    decaissementTypeLabel: null,
  }

  provider = {
    providerId: null,
    providerLabel: '',
    providerAddress: '',
    providerUniqueIdentifier: '',
    providerManagerName: '',
    providerTel: '',
    providerEmail: '',
    providerContacts: [],
  };

  invoice = {
    invoiceId: null,
	invoiceCurrency: 'TND',
    invoiceNumber: '',
    provider: null,
    invoiceDate: null,
    invoiceDeadlineDate: null,
    invoiceNet: 0,
    invoiceRs: 0,
    invoiceRsType: 'VALUE',
    invoiceTotalAmount: 0,

  };
  rsAmount = null;
  dispalyDecaissementTypeModal = false;
  dispalyProviderModal = false;
  dispalyInvoiceProviderModal = false;

  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.getAllAccounts();
    // this.getAllInvoiceProviders();
    this.getAllProviders();
    this.getAllTypesDEcaissements();
  }

  updateTotalAmount() {
    if (this.invoice.invoiceRsType === 'POURCENTAGE') {
      this.rsAmount = (this.invoice.invoiceRs * this.invoice.invoiceNet) / 100;
    } else {
      this.rsAmount = this.invoice.invoiceRs;
    }
    this.invoice.invoiceTotalAmount = this.rsAmount + this.invoice.invoiceNet;
  }
  addNewContact() {
    this.provider.providerContacts.push({
      contactName : '',
      contactPost : '',
      contactTel : '',
      contactEmail : '',
    });
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

  saveInvoice() {
    this.UtilsService.post(UtilsServiceService.API_PROVIDER_INVOICE, this.invoice).subscribe( response => {
      this.dispalyInvoiceProviderModal = false;
      this.getAllInvoiceProviders();
      this.decaissement.decaissementInvoice = response;
      this.UtilsService.showToast('success',
      'Facture fournisseur ajoutée avec succés',
      `La facture fournisseur numéro ${response.invoiceNumber} a été ajoutée avec succés`);
      this.initInvoice();
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de l'ajout de la facture fournisseur numéro ${this.invoice.invoiceNumber}`);
          this.initInvoice();
      });
  }

  saveProvider() {
    this.UtilsService.post(UtilsServiceService.API_PROVIDER, this.provider).subscribe( response => {
      this.dispalyProviderModal = false;
      this.getAllProviders();
      this.decaissement.decaissementProvider = response;
      this.UtilsService.showToast('success',
      'Fournisseur ajouté avec succés',
      `Le fournisseur  ${this.provider.providerLabel} a été ajouté avec succés`);
      this.initProvider();
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de l'ajout du fournisseur  ${this.provider.providerLabel}`);
          this.initProvider();
      });
  }

  getAllInvoiceProviders() {

    const context = this;
    this.UtilsService.get(`${UtilsServiceService.API_PROVIDER_INVOICE}/by-provider-id/${this.decaissement.decaissementProvider.providerId}`).subscribe( response => {
        context.invoices = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des factures fournissuers`);
      });

  }

  getAllProviders() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER).subscribe( response => {
        context.providers = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des fournissuers`);
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

  saveDecaissementType(){

    this.UtilsService.post(UtilsServiceService.API_TYPE_DECAISSEMENT, this.decaissementType).subscribe( response => {
      this.dispalyDecaissementTypeModal = false;
      this.getAllTypesDEcaissements();
      this.decaissement.decaissementType = response;
      this.UtilsService.showToast('success',
      'Type de décaissement ajouté avec succés',
      `Le typde de décaissement ${response.decaissementTypeLabel} a été ajouté avec succés`);
      this.initDecaissementType();
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de l'ajout du type de décaissement ${this.decaissementType.decaissementTypeLabel}`);
          this.initDecaissementType();
      });
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

  initDecaissementType() {
    this.decaissementType = {
      decaissementTypeId: null,
      decaissementTypeLabel: null,
    }
  }

  checkInvoiceValid(): boolean {
    return this.invoice.invoiceNumber == null || this.invoice.invoiceNumber === '' &&
      this.invoice.provider == null;
  }
  initInvoice() {
    this. invoice = {
      invoiceId: null,
    invoiceCurrency: 'TND',
      invoiceNumber: '',
      provider: null,
      invoiceDate: null,
      invoiceDeadlineDate: null,
      invoiceNet: 0,
      invoiceRs: 0,
      invoiceRsType: 'VALUE',
      invoiceTotalAmount: 0,
  
    };
  }
  initProvider() {
    this.provider = {
      providerId: null,
      providerLabel: '',
      providerAddress: '',
      providerUniqueIdentifier: '',
      providerManagerName: '',
      providerTel: '',
      providerEmail: '',
      providerContacts: [],
    };
  
  }
}
