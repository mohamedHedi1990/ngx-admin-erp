import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
@Component({
  selector: 'ngx-nouveau-reglement',
  templateUrl: './nouveau-reglement.component.html',
  styleUrls: ['./nouveau-reglement.component.scss'],
})
export class NouveauReglementComponent implements OnInit {

  @Input() reglement = {
    paymentRuleId: null,
    paymentRuleLabel: null,
    paymentRuleAccount: null,
    paymentRuleAmount: null,
    paymentRulePaymentMethod: null,
    paymentRuleNumber: null,
    PaymentRulesDetails: null,
    paymentRuleDeadlineDate: null,
  };
  @Output() addNewReglementEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  accounts = [];
  @Input() seletcedInvoices: any[] = null;
  
  isPaymentAmountDisabled = false;
  
  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
	  if(this.seletcedInvoices != null && this.seletcedInvoices.length !== 0) {
		  this.seletcedInvoices.forEach(invoice => {
			  this.reglement.paymentRuleAmount =  this.reglement.paymentRuleAmount + invoice.invoicePayment;
		  });
		  this.isPaymentAmountDisabled = true;
	  }
    this.getAllAccounts();
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

}
