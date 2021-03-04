import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';
@Component({
  selector: 'ngx-nouveau-reglement',
  templateUrl: './nouveau-reglement.component.html',
  styleUrls: ['./nouveau-reglement.component.scss'],
})
export class NouveauReglementComponent implements OnInit, OnChanges {
  @Input() reglement = {
    paymentRuleId: null,
    paymentRuleLabel: null,
    paymentRuleAccount: null,
    paymentRuleAmount: null,
    paymentRuleAmountS: null,
    paymentRulePaymentMethod: 'CHEQUE',
    paymentRuleNumber: null,
    PaymentRulesDetails: null,
    paymentRuleDeadlineDate: null,
  };
  @Input() invoice = {

    invoiceNumber: '',
    invoiceTotalAmount: 0,
    invoicePayment: 0,

  }
  @Output() addNewReglementEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  accounts = [];
  @Input() seletcedInvoices: any[] = null;

  isPaymentAmountDisabled = false;
  paymentOlderValue: any;

  @Input() isEncaissement: boolean;
  constructor(private UtilsService: UtilsServiceService,private datePipe: DatePipe) { }

  ngOnInit(): void {

    console.log(" nouveau reglement ");
    // console.log(this.seletcedInvoices);
    // console.log(this.reglement);

    if (this.seletcedInvoices != null && this.seletcedInvoices.length !== 0) {
      let label = 'Reg Fact N° ';
      this.seletcedInvoices.forEach(invoice => {
        if (invoice.invoiceStatus !== 'CLOSED') {
          this.reglement.paymentRuleAmount = 0;
          //this.reglement.paymentRuleAmount = this.reglement.paymentRuleAmount + (invoice.invoiceTotalAmount - invoice.invoicePayment);
          if (label === 'Reg Fact N° ') {
            label = label + invoice.invoiceNumber;
          } else {
            label = label + ' , ' + invoice.invoiceNumber;
          }

        }

      });
      this.reglement.paymentRuleAmountS = this.UtilsService.convertAmountToString('' + this.reglement.paymentRuleAmount);
      //this.isPaymentAmountDisabled = true;
      this.reglement.paymentRuleLabel = label;
    } else {
      if (this.invoice != null) {
        this.reglement.paymentRuleLabel = 'Reg Fact N° ' + this.invoice.invoiceNumber;
      }

    }
    this.getAllAccounts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ng onchanges ");
    console.log(this.reglement);
    console.log(this.invoice);
    this.paymentOlderValue = this.reglement.paymentRuleAmount;
    //this.reglement.paymentRuleAmount = 0;
    console.log('selected ', this.seletcedInvoices);
    if (this.seletcedInvoices != null && this.seletcedInvoices.length !== 0) {
      let label = 'Reg Fact N° ';
      this.seletcedInvoices.forEach(invoice => {
        if (invoice.invoiceStatus !== 'CLOSED') {
          this.reglement.paymentRuleAmount = 0;
          //this.reglement.paymentRuleAmount = this.reglement.paymentRuleAmount + (invoice.invoiceTotalAmount - invoice.invoicePayment);
          if (label === 'Reg Fact N° ') {
            label = label + invoice.invoiceNumber;
          } else {
            label = label + ' , ' + invoice.invoiceNumber;
          }

        }

      });
      this.reglement.paymentRuleAmountS = this.UtilsService.convertAmountToString('' + this.reglement.paymentRuleAmount);
      this.isPaymentAmountDisabled = true;
      this.reglement.paymentRuleLabel = label;
    } else {
      if (this.invoice != null) {
        this.reglement.paymentRuleLabel = 'Reg Fact N° ' + this.invoice.invoiceNumber;
      }


    }
    if (this.reglement.paymentRuleId == null) {
      this.reglement.paymentRuleDeadlineDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    }
    this.getAllAccounts();
  }
  getAllAccounts() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe(response => {
      context.accounts = response;
      if (context.accounts != null && context.accounts.length !== 0) {
        context.reglement.paymentRuleAccount = context.accounts[0];
      }
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des comptes`);
      });

  }

  compareAccount(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.accountId === b.accountId;
  }
  compareDeacissementType(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.encaissementTypeValue === b.encaissementTypeValue;
  }
  compareCustomer(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.customerId === b.customerId;
  }
  compareInvoice(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.invoiceId === b.invoiceId;
  }
  checkAmount() {
    if (this.reglement.paymentRuleAmount == null || this.reglement.paymentRuleAmount === '' || this.reglement.paymentRuleAmount < 0) {
      this.reglement.paymentRuleAmount = 0;
    } else if (this.invoice != null) {
      if (this.paymentOlderValue == null || this.paymentOlderValue == 0) {
        // this for use case add rule
        if (this.reglement.paymentRuleAmount > (this.invoice.invoiceTotalAmount - this.invoice.invoicePayment)) {
          this.reglement.paymentRuleAmount = this.invoice.invoiceTotalAmount - this.invoice.invoicePayment;
          this.reglement.paymentRuleAmount = Math.round(this.reglement.paymentRuleAmount * 1000) / 1000
        }
      }
      else {
        //use for use case update rule
        if (this.reglement.paymentRuleAmount > (this.invoice.invoiceTotalAmount - this.invoice.invoicePayment + this.paymentOlderValue)) {
          this.reglement.paymentRuleAmount = this.invoice.invoiceTotalAmount - this.invoice.invoicePayment + this.paymentOlderValue;
          this.reglement.paymentRuleAmount = Math.round(this.reglement.paymentRuleAmount * 1000) / 1000

        }
      }
    }
    else {
      if (this.reglement.paymentRuleAmount > (this.invoice.invoiceTotalAmount - this.invoice.invoicePayment + this.paymentOlderValue)) {
        this.reglement.paymentRuleAmount = this.invoice.invoiceTotalAmount - this.invoice.invoicePayment + this.paymentOlderValue;
      }
    }
  }





  checkLabel() {
    if (this.reglement.paymentRuleLabel == null || this.reglement.paymentRuleLabel === '') {
      if (this.seletcedInvoices != null && this.seletcedInvoices.length !== 0) {
        let label = 'Reg Fact N° ';
        this.seletcedInvoices.forEach(invoice => {
          if (invoice.invoiceStatus !== 'CLOSED') {
            if (label === 'Reg Fact N° ') {
              label = label + invoice.invoiceNumber;
            } else {
              label = label + ' , ' + invoice.invoiceNumber;
            }
          }

        });
        this.reglement.paymentRuleLabel = label;
      } else {
        this.reglement.paymentRuleLabel = 'Reg Fact N° ' + this.invoice.invoiceNumber;
      }
    }
  }


}
