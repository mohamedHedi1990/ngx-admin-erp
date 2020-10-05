import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'ngx-paiement-client',
  templateUrl: './paiement-client.component.html',
  styleUrls: ['./paiement-client.component.scss'],
})
export class PaiementClientComponent implements OnInit {

  displayPaymentRuleModal = false;
  invoices = [];
  selectedInvoices = [];
  paymentRule = {
    paymentRuleAccount: null,
    paymentRuleAmount: null,
    paymentRulePaymentMethod: null,
    paymentRuleNumber: null,
    PaymentRulesDetails: null,
    paymentRuleDeadlineDate: null,
  };
  loading = false;
  invoice = null;
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
  }
  payInvoices() {
    const invoicePayment = {
      selectedInvoices: this.selectedInvoices,
      paymentRule: this.paymentRule,
    };
    this.UtilsService.post(UtilsServiceService.API_INVOICE + '/pay', invoicePayment).subscribe( response => {

        this.UtilsService.showToast('success',
          'Factures payées avec succés',
          `Les factures selectionnées ont été payées et fermées avec succés`);
        this.selectedInvoices = [];
        this.initPaymentRule();
        this.getAllInvoices();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de paiement de factures seletionnées`);
        this.selectedInvoices = [];
        this.initPaymentRule();
      });

  }

  savePaymentRule() {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_INVOICE + '/' + this.invoice.invoiceId, this.paymentRule).subscribe( response => {

        this.UtilsService.showToast('success',
          'Réglement ajoutée avec succés',
          `Un réglement a été ajoutée avec succés à la facture ${this.invoice.invoiceNumber}`);
        this.displayPaymentRuleModal = false;
        this.initPaymentRule();
        context.getAllInvoices();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de l'ajout du réglement`);
        this.displayPaymentRuleModal = false;
        this.initPaymentRule();
      });

  }


  getAllInvoices() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_CUSTOMER_INVOICE).subscribe( response => {
        context.invoices = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des factures`);
      });
  }

  initPaymentRule() {
    this.paymentRule = {
      paymentRuleAccount: null,
      paymentRuleAmount: null,
      paymentRulePaymentMethod: null,
      paymentRuleNumber: null,
      PaymentRulesDetails: null,
      paymentRuleDeadlineDate: null,
    };
  }


}
