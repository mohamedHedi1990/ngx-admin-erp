import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ngx-liste-factures-fournisseurs',
  templateUrl: './liste-factures-fournisseurs.component.html',
  styleUrls: ['./liste-factures-fournisseurs.component.scss'],
})
export class ListeFacturesFournisseursComponent implements OnInit {
  showProviderInvoiceWindow = false;
  invoices = [];
  loading = false;
  invoice = null;
  displayDeleteProviderInvoice = false;
  constructor(private UtilsService: UtilsServiceService,
    public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initInvoice();
    this.getAllInvoices();
  }
  saveInvoice(invoice) {

    const context = this;
    invoice.invoiceTotalAmount = Math.round(invoice.invoiceTotalAmount * 1000) / 1000
    this.UtilsService.post(UtilsServiceService.API_PROVIDER_INVOICE, invoice).subscribe(response => {
      this.hideInvoiceWindow();
      if (invoice.invoiceId == null) {
        this.UtilsService.showToast('success',
          'Facture ajoutée avec succés',
          `La facture fournisseur numéro  ${invoice.invoiceNumber} a été ajoutée avec succcés`);
      } else {
        this.UtilsService.showToast('success',
          'Facture modfiée avec succés',
          `La facture fournisseur numéro  ${invoice.invoiceNumber} a été modifiée avec succcés`);
      }
      context.getAllInvoices();
      context.initInvoice();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la souvegar de facture fournisseur numéro  ${invoice.invoiceNumber}`);
      });

  }
  hideInvoiceWindow() {
    this.showProviderInvoiceWindow = false;
  }

  getAllInvoices() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER_INVOICE).subscribe(response => {
      context.invoices = response;
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des factures`);
      });
  }

  editInvoice(invoice) {
    this.invoice = invoice;
    this.showProviderInvoiceWindow = true;
  }

  delInvoice() {
    const context = this;
    const url = UtilsServiceService.API_INVOICE + '/' + this.invoice.invoiceId;
    this.UtilsService.delete(url).subscribe(response => {
      this.UtilsService.showToast('success',
        'Facture supprimée avec succés',
        `La facture fournisseur numéro  ${this.invoice.invoiceNumber} a été supprimée avec succcés`);
      context.getAllInvoices();
      this.displayDeleteProviderInvoice = false;
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la suppression de facture fournisseur numéro  ${this.invoice.invoiceNumber}`);
        this.displayDeleteProviderInvoice = false;
      });


  }

  deleteInvoice(invoice) {
    this.invoice = invoice;
    this.displayDeleteProviderInvoice = true;

  }
  initInvoice() {
    this.invoice = {
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
      invoiceDeadlineInNumberOfDays: 0,

    };
  }
}
