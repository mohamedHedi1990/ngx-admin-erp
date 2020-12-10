import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-nouveau-encaissement',
  templateUrl: './nouveau-encaissement.component.html',
  styleUrls: ['./nouveau-encaissement.component.scss']
})
export class NouveauEncaissementComponent implements OnInit {

  @Input() encaissement = {
    encaissementId: null,
    encaissementType: null,
    encaissementDeadlineDate : this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    encaissementPaymentType: null,
    encaissementPaymentRuleNumber: null,
    encaissementPaymentRuleDetails: null,
    encaissementAmount : null,
    encaissementLabel: null,
    encaissementDetails : null,
    encaissementInvoice : null,
    encaissementBankAccount : null,
    encaissementCustomer: null,
    encaissementChequeImpaye: null,
    encaissementCurrency: 'TND',
  };
  @Output() addNewEncaissementEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  accounts = [];
  encaissementTypes = [];
  invoices = [];
  customers = [];

  encaissementType = {
    encaissementTypeId: null,
    encaissementTypeLabel: null,
  }

  customer = {
    customerId: null,
    customerLabel: '',
    customerAddress: '',
    customerUniqueIdentifier: '',
    customerManagerName: '',
    customerTel: '',
    customerEmail: '',
    customerContacts: [],
  };

  invoice = {
    invoiceId: null,
	invoiceCurrency: 'TND',
    invoiceNumber: '',
    customer: null,
    invoiceDate:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    invoiceDeadlineDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    invoiceNet: 0,
    invoiceRs: 0,
    invoiceRsType: 'POURCENTAGE',
    invoiceTotalAmount: 0,

  };

  maxDateInvoiceDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  minDateDeadlineDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  rsAmount = null;
  dispalyEncaissementTypeModal = false;
  dispalyCustomerModal = false;
  dispalyInvoiceCustomerModal = false;
  updateTotalAmount() {
    if (this.invoice.invoiceRsType === 'POURCENTAGE') {
      this.rsAmount = (this.invoice.invoiceRs * this.invoice.invoiceNet) / 100;
    } else {
      this.rsAmount = this.invoice.invoiceRs;
    }
    this.rsAmount=Math.round(this.rsAmount * 1000) / 1000
    this.invoice.invoiceTotalAmount =this.invoice.invoiceNet- this.rsAmount ;
    this.invoice.invoiceTotalAmount=Math.round(this.invoice.invoiceTotalAmount * 1000) / 1000
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

  constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) {
   }

  ngOnInit(): void {
    this.getAllAccounts();
    if (this.encaissement.encaissementCustomer != null) {
      this.getAllInvoiceCustomers();
    }
   
    this.getAllCustomers();
    this.getAllTypesEncaissements();
  }

  
  addNewContact() {
    this.customer.customerContacts.push({
      contactName : '',
      contactPost : '',
      contactTel : '',
      contactEmail : '',
    });
  }
  updateAmount() {
    console.log("update amount ")
    if( this.encaissement.encaissementType != null &&
      this.encaissement.encaissementType.encaissementTypeValue ===
        'REGLEMENT_FACTURE_CLIENT' && this.encaissement.encaissementInvoice != null) {
          const restantAmount = this.encaissement.encaissementInvoice.invoiceTotalAmount - this.encaissement.encaissementInvoice.invoicePayment;
          this.encaissement.encaissementAmount = restantAmount;
          console.log("update amount ");
          console.log(restantAmount);
        }
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
    this.UtilsService.post(UtilsServiceService.API_CUSTOMER_INVOICE, this.invoice).subscribe( response => {
      this.dispalyInvoiceCustomerModal = false;
      this.getAllInvoiceCustomers();
      this.encaissement.encaissementInvoice = response;
      this.updateAmount();
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

  saveCustomer() {
    this.UtilsService.post(UtilsServiceService.API_CLIENT, this.customer).subscribe( response => {
      this.dispalyCustomerModal = false;
      this.getAllCustomers();
      this.encaissement.encaissementCustomer = response;
      this.UtilsService.showToast('success',
      'Fournisseur ajouté avec succés',
      `Le fournisseur  ${this.customer.customerLabel} a été ajouté avec succés`);
      this.initCustomer();
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de l'ajout du fournisseur  ${this.customer.customerLabel}`);
          this.initCustomer();
      });
  }

  getAllInvoiceCustomers() {
/*this.invoices = [
  {
    invoiceId: 1,
invoiceCurrency: 'TND',
invoiceNumber: 'REF123',
  },
  {
    invoiceId: 2,
invoiceCurrency: 'TND',
invoiceNumber: 'REF12325565',
  }
];*/
    
    this.invoices = [];
    if (this.encaissement.encaissementCustomer != null) {
      const context = this;
      this.UtilsService.get(`${UtilsServiceService.API_CUSTOMER_INVOICE}/by-customer-id/${this.encaissement.encaissementCustomer.customerId}`).subscribe( response => {
          context.invoices = response;
          console.log('invoices --------------------------------- ', context.invoices);
        },
        error => {
          this.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors du chargement des factures fournissuers`);
        });
  
    }

    console.log("customer client ");
    console.log(this.encaissement.encaissementCustomer.customerLabel);
    this.invoice.customer=this.encaissement.encaissementCustomer;
  }

  getAllCustomers() {
   
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_CLIENT).subscribe( response => {
        context.customers = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des fournissuers`);
      });
  }

  getAllTypesEncaissements() {
/*this.encaissementTypes = [
  {
    encaissementTypeValue: 'PAIEMENT_FACTURE_FOURNISSEUR',
    encaissementTypeLabel: 'Paiement facture fournisseur'
  },
  {
    encaissementTypeValue: 'CHEQUE_IMPAYE',
    encaissementTypeLabel: 'Cheque impayé'
  },
  {
    encaissementTypeValue: 'SALAIRE',
    encaissementTypeLabel: 'Salaire'
  },
  {
    encaissementTypeValue: 'INTERETS',
    encaissementTypeLabel: 'Intérets'
  },
  {
    encaissementTypeValue: 'COMISSION_BANCAIRE',
    encaissementTypeLabel: 'Comission bancaire'
  },
];*/

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_TYPE_ENCAISSEMENT).subscribe( response => {
        context.encaissementTypes = response;
        console.log('type decaiss--------------------------- ',  context.encaissementTypes);
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des types des décaissements`);
      }); 

  }

  changeAccount() {
    if(this.encaissement.encaissementBankAccount != null) {
      this.encaissement.encaissementCurrency = this.encaissement.encaissementBankAccount.accountCurrency;
    }
  }

  saveEncaissement(){

    this.addNewEncaissementEvent.emit(this.encaissement);
  }

  saveEncaissementType(){

    this.UtilsService.post(UtilsServiceService.API_TYPE_ENCAISSEMENT, this.encaissementType).subscribe( response => {
      this.dispalyEncaissementTypeModal = false;
      this.getAllTypesEncaissements();
      this.encaissement.encaissementType = response;
      this.UtilsService.showToast('success',
      'Type de décaissement ajouté avec succés',
      `Le typde de décaissement ${response.encaissementTypeLabel} a été ajouté avec succés`);
      this.initEncaissementType();
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de l'ajout du type de décaissement ${this.encaissementType.encaissementTypeLabel}`);
          this.initEncaissementType();
      });
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkEncaissementValid(): boolean {
    return this.encaissement.encaissementType == null || this.encaissement.encaissementDeadlineDate === null || (this.encaissement.encaissementPaymentRuleNumber === null && 
      (this.encaissement.encaissementPaymentType === 'CHEQUE' || this.encaissement.encaissementPaymentType === 'TRAITE'))
      || this.encaissement.encaissementPaymentType == null
      || this.encaissement.encaissementAmount == null
      || this.encaissement.encaissementLabel == null
      || this.encaissement.encaissementBankAccount == null
      || (this.encaissement.encaissementInvoice == null && this.encaissement.encaissementType.encaissementType ===
        'REGLEMENT_FACTURE_CLIENT')
        || (this.encaissement.encaissementCustomer == null && this.encaissement.encaissementType.encaissementType ===
          'REGLEMENT_FACTURE_CLIENT');
  }

  initEncaissementType() {
    this.encaissementType = {
      encaissementTypeId: null,
      encaissementTypeLabel: null,
    }
  }

  checkInvoiceValid(): boolean {
    return this.invoice.invoiceNumber == null || this.invoice.invoiceNumber === '' &&
      this.invoice.customer == null;
  }
  initInvoice() {
    this. invoice = {
      invoiceId: null,
    invoiceCurrency: 'TND',
      invoiceNumber: '',
      customer: this.encaissement.encaissementCustomer,
      invoiceDate: null,
      invoiceDeadlineDate: null,
      invoiceNet: 0,
      invoiceRs: 0,
      invoiceRsType: 'VALUE',
      invoiceTotalAmount: 0,
  
    };
  }
  initCustomer() {
    this.customer = {
      customerId: null,
      customerLabel: '',
      customerAddress: '',
      customerUniqueIdentifier: '',
      customerManagerName: '',
      customerTel: '',
      customerEmail: '',
      customerContacts: [],
    };
  
  }

}
