import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-paiement-fournisseur',
  templateUrl: './paiement-fournisseur.component.html',
  styleUrls: ['./paiement-fournisseur.component.scss'],
})
export class PaiementFournisseurComponent implements OnInit {
  displayPaymentRuleModal = false;
  displayValidatePaymentRuleModal = false;
  displayDeletePaymentRuleModal = false;
  invoices = [];
  selectedInvoices = [];
  paymentRule = {
    paymentRuleId: null,
    paymentRuleLabel: null,
    paymentRuleAccount: null,
    paymentRuleAmount: null,
    paymentRulePaymentMethod: 'CHEQUE',
    paymentRuleNumber: null,
    PaymentRulesDetails: null,
    paymentRuleDeadlineDate: null,
    paymentRuleOperationType: 'DECAISSEMENT',
  };
  loading = false;
  invoice = null;
  invoiceUpdate: any;
  isUpdate = false;
  titleHeader: any;
  constructor(private UtilsService: UtilsServiceService,
    public dialogService: DialogService, private confirmationService: ConfirmationService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.paymentRule.paymentRuleDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getAllInvoices();
  }
  initInvoiceId() {
    this.invoice = null;
  }
  addPaymentRule(data) {
    this.invoice = data;
    this.displayPaymentRuleModal = true;
    this.titleHeader = "Ajouter un reglement";
  }
  payInvoices() {
    const invoicePayment = {
      selectedInvoices: this.selectedInvoices,
      paymentRule: this.paymentRule,
    };
    this.UtilsService.post(UtilsServiceService.API_PROVIDER_INVOICE + '/pay', invoicePayment).subscribe(response => {

      this.UtilsService.showToast('success',
        'Factures payées avec succés',
        `Les factures selectionnées ont été payées et fermées avec succés`);
      this.selectedInvoices = [];
      this.initPaymentRule();
      this.displayPaymentRuleModal = false;
      this.getAllInvoices();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de paiement de factures seletionnées`);
        this.selectedInvoices = [];
        this.initPaymentRule();
        this.displayPaymentRuleModal = false;
      });

  }

  deleteAttachedInvoices(invoice) {
    this.UtilsService.delete(UtilsServiceService.API_PROVIDER_ATTACHED_INVOICES  + '/' + invoice.associatedAttachedInvoicesId).subscribe(response => {
      this.getAllInvoices();
      this.UtilsService.showToast('success',
      'Réglements attachés supprimés avec succés',
      `Un ou des réglements associés ont été supprimés avec succés`);
    }, error => {
      this.UtilsService.showToast('danger',
      'Erreur interne',
      `Un erreur interne lors de suppression de(s) réglement(s) associés`);
    });
  }

  savePaymentRule(validateAndAdd: boolean) {
    console.log("error paymennt ");
    if (this.isUpdate == true) {
      console.log("error ");
      this.invoice = this.invoiceUpdate;
      this.UtilsService.post(UtilsServiceService.API_INVOICE + '/updatePaymentRule/' + this.invoice.invoiceId + '/PROVIDER', this.paymentRule).subscribe(response => {

        this.UtilsService.showToast('success',
          'Réglement modifiée avec succés',
          `Un réglement a été modifiéé avec succés à la facture ${this.invoice.invoiceNumber}`);
        if (!validateAndAdd) {
          this.displayPaymentRuleModal = false;
          this.initPaymentRule();
          this.invoice = null;

        } else {
          this.paymentRule.paymentRuleNumber = null;
          this.paymentRule.paymentRuleAmount = 0;
          this.displayPaymentRuleModal = true;
          this.invoice = response;
        }
        this.getAllInvoices();
        this.isUpdate = false;
      },
        error => {
          this.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de modification du réglement`);
          this.displayPaymentRuleModal = false;
          this.initPaymentRule();
        });

    }
    else {
      console.log("modifier");
      console.log(this.invoice.invoiceId);
      const context = this;
      this.UtilsService.post(UtilsServiceService.API_INVOICE + '/' + this.invoice.invoiceId, this.paymentRule).subscribe(response => {

        this.UtilsService.showToast('success',
          'Réglement ajoutée avec succés',
          `Un réglement a été ajoutée avec succés à la facture ${this.invoice.invoiceNumber}`);
        if (!validateAndAdd) {
          this.displayPaymentRuleModal = false;
          this.initPaymentRule();
          this.invoice = null;

        } else {
          this.paymentRule.paymentRuleNumber = null;
          this.paymentRule.paymentRuleAmount = 0;
          this.displayPaymentRuleModal = true;
          this.invoice = response;
        }
        this.getAllInvoices();

      },
        error => {
          this.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de l'ajout du réglement`);
          this.displayPaymentRuleModal = false;
          this.initPaymentRule();
        });
    }


  }

  resetSelectedInvoices() {
    this.selectedInvoices = [];
  }



  getAllInvoices() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER_INVOICE + '/with-attached-invoices').subscribe(response => {
      context.invoices = response;
      console.log('invoices ', this.invoices);
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des factures`);
      });
  }
  ValidatePR(reglement) {

    this.paymentRule = reglement;
    this.displayValidatePaymentRuleModal = true;
  }
  ModifyPR(reglement, invoice) {
    this.selectedInvoices.length = 0;
    this.invoice = invoice;
    this.invoiceUpdate = invoice;
    this.isUpdate = true;
    this.paymentRule = reglement;
    this.displayPaymentRuleModal = true;
    this.titleHeader = "Modifier un reglement";
  }
  deletePR(reglement) {

    this.paymentRule = reglement;
    this.displayDeletePaymentRuleModal = true;
  }
  validatePaymentRule() {
    const context = this;
    this.UtilsService.put(UtilsServiceService.API_PAYMENT_RULE + '/' + this.paymentRule.paymentRuleId, null).subscribe(response => {

      this.UtilsService.showToast('success',
        'Réglement validé avec succés',
        `Le réglement ${this.paymentRule.paymentRuleLabel} a été validé avec succés`);
      this.displayValidatePaymentRuleModal = false;
      context.getAllInvoices();
      this.initPaymentRule();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la validation du réglement ${this.paymentRule.paymentRuleLabel}`);
        this.displayValidatePaymentRuleModal = false;
        this.initPaymentRule();
      });


  }
  delPaymentRule(pRule) {
    this.paymentRule = pRule;
    this.displayDeletePaymentRuleModal = true;
  }
  deletePaymentRule() {

    const context = this;
    this.UtilsService.delete(UtilsServiceService.API_PAYMENT_RULE + '/' + this.paymentRule.paymentRuleId + '/PROVIDER').subscribe(response => {

      this.UtilsService.showToast('success',
        'Réglement supprimé avec succés',
        `Le réglement ${this.paymentRule.paymentRuleLabel} a été supprimé avec succés`);
      this.displayDeletePaymentRuleModal = false;
      context.getAllInvoices();
      this.initPaymentRule();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la suppression du réglement ${this.paymentRule.paymentRuleLabel}`);
        this.displayDeletePaymentRuleModal = false;
        this.initPaymentRule();
      });



  }

  initPaymentRule() {
    this.paymentRule = {
      paymentRuleId: null,
      paymentRuleLabel: null,
      paymentRuleAccount: null,
      paymentRuleAmount: null,
      paymentRulePaymentMethod: 'CHEQUE',
      paymentRuleNumber: null,
      PaymentRulesDetails: null,
      paymentRuleDeadlineDate: null,
      paymentRuleOperationType: 'DECAISSEMENT',
    };
  }

}
