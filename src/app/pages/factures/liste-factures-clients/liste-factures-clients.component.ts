import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ngx-liste-factures-clients',
  templateUrl: './liste-factures-clients.component.html',
  styleUrls: ['./liste-factures-clients.component.scss'],
})
export class ListeFacturesClientsComponent implements OnInit {
  showCustomerInvoiceWindow = false;
  invoices = [];
  loading = false;
  invoice = null;
  displayDeleteCustomerInvoice = false;
  constructor(private UtilsService: UtilsServiceService,
    public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initInvoice();
    this.getAllInvoices();
  }
  saveInvoice(invoice) {

    const context = this;
    invoice.invoiceTotalAmount = Math.round(invoice.invoiceTotalAmount * 1000) / 1000.
    this.UtilsService.post(UtilsServiceService.API_CUSTOMER_INVOICE, invoice).subscribe(response => {
      this.hideInvoiceWindow();
      if (invoice.invoiceId == null) {
        this.UtilsService.showToast('success',
          'Facture ajoutée avec succés',
          `La facture client numéro  ${invoice.invoiceNumber} a été ajoutée avec succcés`);
      } else {
        this.UtilsService.showToast('success',
          'Facture modfiée avec succés',
          `La facture client numéro  ${invoice.invoiceNumber} a été modifiée avec succcés`);
      }
      context.getAllInvoices();
      context.initInvoice();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la souvegar de facture client numéro  ${invoice.invoiceNumber}`);
      });

  }
  hideInvoiceWindow() {
    this.showCustomerInvoiceWindow = false;
  }

  getAllInvoices() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_CUSTOMER_INVOICE).subscribe(response => {
      context.invoices = response;
      console.log("all invoice customers");
      console.log(response);
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des factures`);
      });
  }

  editInvoice(invoice) {
    this.invoice = invoice;
    this.showCustomerInvoiceWindow = true;
  }

  delInvoice() {
    const context = this;
    const url = UtilsServiceService.API_INVOICE + '/' + this.invoice.invoiceId;
    this.UtilsService.delete(url).subscribe(response => {
      this.UtilsService.showToast('success',
        'Facture supprimée avec succés',
        `La facture client numéro  ${this.invoice.invoiceNumber} a été supprimée avec succcés`);
      context.getAllInvoices();
      this.displayDeleteCustomerInvoice = false;
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la suppression de facture client numéro  ${this.invoice.invoiceNumber}`);
        this.displayDeleteCustomerInvoice = false;
      });


  }

  deleteInvoice(invoice) {
    this.invoice = invoice;
    this.displayDeleteCustomerInvoice = true;
  }
  initInvoice() {
    this.invoice = {
      invoiceId: null,
      invoiceNumber: '',
      customer: null,
      invoiceDate: null,
      invoiceDeadlineDate: null,
      invoiceNet: 0,
      invoiceRs: 0,
      invoiceRsType: 'VALUE',
      invoiceTotalAmount: 0,
      invoiceDeadlineInNumberOfDays: 0,
      invoiceCurrency: 'TND',

    };
  }

  closeInvoice(invoice) {
    const context = this;
    const url = UtilsServiceService.API_INVOICE + '/' + invoice.invoiceId;
    this.UtilsService.put(url, null).subscribe(response => {
      this.UtilsService.showToast('success',
        'Facture fermée avec succés',
        `La facture client numéro  ${invoice.invoiceNumber} a été fermée avec succcés`);
      context.getAllInvoices();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la fermeture de facture client numéro  ${invoice.invoiceNumber}`);
      });


  }
}
