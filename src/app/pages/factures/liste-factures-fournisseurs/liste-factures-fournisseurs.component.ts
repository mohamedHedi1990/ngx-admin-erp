import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';

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
  constructor(private UtilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initInvoice();
    this.getAllInvoices();
  }
  saveInvoice() {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_PROVIDER_INVOICE, this.invoice).subscribe( response => {
        this.hideInvoiceWindow();
        if ( context.invoice.invoiceId == null) {
          this.UtilsService.showToast('success',
            'Facture ajoutée avec succés',
            `La facture fournisseur numéro  ${this.invoice.invoiceNumber} a été ajoutée avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Facture modfiée avec succés',
            `La facture fournisseur numéro  ${this.invoice.invoiceNumber} a été modifiée avec succcés`);
        }
        context.getAllInvoices();
        context.initInvoice();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegar de facture fournisseur numéro  ${this.invoice.invoiceNumber}`); });

  }
  hideInvoiceWindow() {
    this.showProviderInvoiceWindow = false;
  }

  getAllInvoices() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER_INVOICE).subscribe( response => {
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

  delInvoice(invoice) {
    const context = this;
    const url = UtilsServiceService.API_PROVIDER_INVOICE + '/' + invoice.invoiceId;
    this.UtilsService.delete(`${UtilsServiceService.API_PROVIDER_INVOICE}/${invoice.invoiceId}`).subscribe( response => {
        this.UtilsService.showToast('success',
          'Facture supprimée avec succés',
          `La facture fournisseur numéro  ${invoice.invoiceNumber} a été supprimée avec succcés`);
        context.getAllInvoices();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression de facture fournisseur numéro  ${invoice.invoiceNumber}`);
      });


  }

  deleteInvoice(invoice) {
    this.confirmationService.confirm({
      message: `Voulez vous vraiment supprimer la facture fournisseur numéro  ${invoice.invoiceNumber}?`,
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      header: `Supprimer une facture`,
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delInvoice(invoice);
      },
    });
  }
  initInvoice() {
    this.invoice = {
      invoiceId: null,
      invoiceNumber: null,
      invoiceDeadlineInNumberOfDays: 0,
      invoiceDeadlineDate: new Date(),
      invoiceDate: new Date(),
      invoiceTotalAmount: 0,
      invoiceRs: 0,
      invoiceRsType: 'VALUE',
      invoiceNet: 0,
      invoicePayment: 0,
      invoiceStatus: 'OPENED',
      invoicePaymentRules: [],
      provider : null,
    };
  }
  }
