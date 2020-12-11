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
  displayValidatePaymentRuleModal = false;
  displayDeletePaymentRuleModal = false;
  invoices = [];
  selectedInvoices = [];
  paymentRule = {
    paymentRuleId: null,
    paymentRuleLabel: null,
    paymentRuleAccount: null,
    paymentRuleAmount: null,
    paymentRulePaymentMethod:'CHEQUE',
    paymentRuleNumber: null,
    PaymentRulesDetails: null,
    paymentRuleDeadlineDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    paymentRuleOperationType:'ENCAISSEMENT',
  };
  loading = false;
  invoice = null;
  invoiceUpdate: any;
  isUpdate=false;
  titleHeader:any;
  constructor(
              private UtilsService: UtilsServiceService,
              public dialogService: DialogService, 
              private confirmationService: ConfirmationService,
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
    this.titleHeader="Nouvel reglement";

  }
  payInvoices() {
    const invoicePayment = {
      selectedInvoices: this.selectedInvoices,
      paymentRule: this.paymentRule,
    };
    this.UtilsService.post(UtilsServiceService.API_CUSTOMER_INVOICE + '/pay', invoicePayment).subscribe( response => {

        this.UtilsService.showToast('success',
          'Factures payées avec succés',
          `Les factures selectionnées ont été payées et fermées avec succés`);
        this.selectedInvoices = [];
        this.initPaymentRule();
        this.displayPaymentRuleModal = false;
        this.getAllInvoices();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de paiement de factures seletionnées`);
        this.selectedInvoices = [];
        this.initPaymentRule();
        this.displayPaymentRuleModal = false;
    });

  }

  savePaymentRule(validateAndAdd: boolean) {
    console.log("error paymennt ");
    if(this.isUpdate==true)
    {
      console.log("error ");
      this.invoice=this.invoiceUpdate;
      this.UtilsService.post(UtilsServiceService.API_INVOICE + '/updatePaymentRule/' + this.invoice.invoiceId, this.paymentRule).subscribe( response => {

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
        this.isUpdate=false; 
        },
        error => {this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de modification du réglement`);
          this.displayPaymentRuleModal = false;
          this.initPaymentRule();
      });
     
    }
    else
    {
    console.log("modifier");
    console.log(this.invoice.invoiceId);
    const context = this;
    this.UtilsService.post(UtilsServiceService.API_INVOICE + '/' + this.invoice.invoiceId, this.paymentRule).subscribe( response => {

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
      error => {this.UtilsService.showToast('danger',
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
    this.UtilsService.get(UtilsServiceService.API_CUSTOMER_INVOICE).subscribe( response => {
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
  ModifyPR(reglement,invoice) {
    console.log("reglement d'une facture");
    console.log(reglement);
    console.log("invoice de reglement");
    console.log(invoice);
    this.selectedInvoices.length=0;
    this.invoice=invoice;
    this.invoiceUpdate=invoice; 
    this.isUpdate=true;
    this.paymentRule = reglement;
    this.displayPaymentRuleModal = true;
    this.titleHeader="Modification d'un reglement";
  }
  delPaymentRule(reglement) {
    console.log("regle to delete");
    console.log(reglement);
	  this.paymentRule = reglement;
	  this.displayDeletePaymentRuleModal = true;
  }
  validatePaymentRule()  {
	  const context = this;
    this.UtilsService.put(UtilsServiceService.API_PAYMENT_RULE + '/' + this.paymentRule.paymentRuleId, null).subscribe( response => {

      this.UtilsService.showToast('success',
      'Réglement validé avec succés',
      `Le réglement ${this.paymentRule.paymentRuleLabel} a été validé avec succés`);
      this.displayValidatePaymentRuleModal = false;
       context.getAllInvoices();
	   this.initPaymentRule();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la validation du réglement ${this.paymentRule.paymentRuleLabel}`);
        this.displayValidatePaymentRuleModal = false;
		this.initPaymentRule();
    });


  }

  rapprocherOperation() {

  }

  deletePaymentRule() {

	  const context = this;
    this.UtilsService.delete(UtilsServiceService.API_PAYMENT_RULE + '/' + this.paymentRule.paymentRuleId).subscribe( response => {

      this.UtilsService.showToast('success',
      'Réglement supprimé avec succés',
      `Le réglement ${this.paymentRule.paymentRuleLabel} a été supprimé avec succés`);
      this.displayDeletePaymentRuleModal = false;
       context.getAllInvoices();
	   this.initPaymentRule();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du réglement ${this.paymentRule.paymentRuleLabel}`);
        this.displayDeletePaymentRuleModal = false;
		this.initPaymentRule();
    });



  }

  showPaymentInvoices() {
	  this.selectedInvoices.forEach(element => {
		  this.paymentRule.paymentRuleAmount = this.paymentRule.paymentRuleAmount + element.invoiceTotalAmount;
	  });
	  this.displayPaymentRuleModal = true;
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
    paymentRuleDeadlineDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    paymentRuleOperationType: 'ENCAISSEMENT',
  };
}


}
