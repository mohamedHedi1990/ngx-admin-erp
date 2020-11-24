import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
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
    invoicePayment : 0,

  }
  @Output() addNewReglementEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  accounts = [];
  @Input() seletcedInvoices: any[] = null;

  isPaymentAmountDisabled = false;

  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
    if (this.seletcedInvoices != null && this.seletcedInvoices.length !== 0) {
      let label = 'Reg Fact N° ';
      this.seletcedInvoices.forEach(invoice => {
        if(invoice.invoiceStatus !== 'CLOSED') {
          this.reglement.paymentRuleAmount =  this.reglement.paymentRuleAmount + (invoice.invoiceTotalAmount - invoice.invoicePayment);
          if(label === 'Reg Fact N° ') {
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
      this.reglement.paymentRuleLabel = 'Reg Fact N° ' + this.invoice.invoiceNumber;
    }
    this.getAllAccounts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.reglement.paymentRuleAmount = 0;
    console.log('selected ', this.seletcedInvoices);
    if (this.seletcedInvoices != null && this.seletcedInvoices.length !== 0) {
      let label = 'Reg Fact N° ';
      this.seletcedInvoices.forEach(invoice => {
        if(invoice.invoiceStatus !== 'CLOSED') {
          this.reglement.paymentRuleAmount =  this.reglement.paymentRuleAmount + (invoice.invoiceTotalAmount - invoice.invoicePayment);
          if(label === 'Reg Fact N° ') {
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
      this.reglement.paymentRuleLabel = 'Reg Fact N° ' + this.invoice.invoiceNumber;
    }
  }
  getAllAccounts() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
        if(context.accounts != null && context.accounts.length !==0) {
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
    if (a==null || b== null) return true;
    return a.accountId === b.accountId;
  }
  compareDeacissementType(a: any, b: any): boolean {
    if (a==null || b== null)return true;
    return a.encaissementTypeValue === b.encaissementTypeValue;
  }
  compareCustomer(a: any, b: any): boolean {
    if (a==null || b== null) return true;
    return a.customerId === b.customerId;
  }
  compareInvoice(a: any, b: any): boolean {
    if (a==null || b== null) return true;
    return a.invoiceId === b.invoiceId;
  }
  checkAmount() {
    if (this.reglement.paymentRuleAmount == null || this.reglement.paymentRuleAmount === '' || this.reglement.paymentRuleAmount < 0) {
      this.reglement.paymentRuleAmount = 0;
    } else if (this.invoice != null) {
      if (this.reglement.paymentRuleAmount > (this.invoice.invoiceTotalAmount - this.invoice.invoicePayment)) {
        this.reglement.paymentRuleAmount = this.invoice.invoiceTotalAmount - this.invoice.invoicePayment;
      }
    }
  }

  checkLabel() {
    if(this.reglement.paymentRuleLabel == null || this.reglement.paymentRuleLabel === '') {
      if (this.seletcedInvoices != null && this.seletcedInvoices.length !== 0) {
        let label = 'Reg Fact N° ';
        this.seletcedInvoices.forEach(invoice => {
          if (invoice.invoiceStatus !== 'CLOSED') {
            if(label === 'Reg Fact N° ') {
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
