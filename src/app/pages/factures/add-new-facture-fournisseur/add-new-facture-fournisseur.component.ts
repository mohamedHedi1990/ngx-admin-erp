import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-add-new-facture-fournisseur',
  templateUrl: './add-new-facture-fournisseur.component.html',
  styleUrls: ['./add-new-facture-fournisseur.component.scss'],
})
export class AddNewFactureFournisseurComponent implements OnInit {

  @Input() invoice = {
    invoiceId: null,
    invoiceCurrency: 'TND',
    invoiceNumber: '',
    provider: null,
    invoiceDate: null,
    invoiceDeadlineDate: null,
    invoiceNet: 0,
    invoiceRs: 0,
    invoiceRsType: 'POURCENTAGE',
    invoiceTotalAmount: 0,
    invoiceDeadlineInNumberOfDays: 0,

  };
  rsAmount = null;
  @Output() addNewProviderInvoiceEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  providers = [];
  maxDateInvoiceDate;
  minDateDeadlineDate;
  constructor(private UtilsService: UtilsServiceService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {


    // this.invoice.invoiceDate = this.UtilsService.now('yyyy-MM-dd');
    if (this.invoice.invoiceId == null) {
      this.rsAmount = 0;
      this.invoice.invoiceRsType = 'POURCENTAGE'
      this.invoice.invoiceDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.invoice.invoiceDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    } else {
      this.rsAmount = 0;
      if (this.invoice.invoiceRsType == 'POURCENTAGE') {
        this.rsAmount = (this.invoice.invoiceRs * this.invoice.invoiceNet) / 100;

      }
      this.invoice.invoiceDate = this.datePipe.transform(this.invoice.invoiceDate, 'yyyy-MM-dd');
      this.invoice.invoiceDeadlineDate = this.datePipe.transform(this.invoice.invoiceDeadlineDate, 'yyyy-MM-dd');
    }
    this.maxDateInvoiceDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.minDateDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.datePipe.transform(new Date(), 'dd-MM-yyyy'));
    this.getAllProviders();
  }

  compareProvider(a: any, b: any): boolean {
    if (a==null || b== null) return true;
    return a.providerId === b.providerId;
  }

  saveInvoice() {
    console.log("Invoice to save ");
    console.log(this.invoice);
    this.addNewProviderInvoiceEvent.emit(this.invoice);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkInvoiceValid(): boolean {
    return this.invoice.invoiceNumber == null || this.invoice.invoiceNumber === '' ||
      this.invoice.provider == null;
  }
  getAllProviders() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER).subscribe(response => {
      context.providers = response;
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des fournisseurs`);
      });

  }

  updateTotalAmount() {
    if (this.invoice.invoiceRsType === 'POURCENTAGE') {
      this.rsAmount = (this.invoice.invoiceRs * this.invoice.invoiceNet) / 100;
    } else {
      this.rsAmount = this.invoice.invoiceRs;
    }
    this.rsAmount = Math.round(this.rsAmount * 1000) / 1000
    this.invoice.invoiceTotalAmount = this.invoice.invoiceNet - this.rsAmount;
    this.invoice.invoiceTotalAmount = Math.round(this.invoice.invoiceTotalAmount * 1000) / 1000
  }
  changeInvoiceDate() {
    this.minDateDeadlineDate = this.invoice.invoiceDate;
    if (this.invoice.invoiceDate > this.invoice.invoiceDeadlineDate) {
      this.invoice.invoiceDeadlineDate = this.invoice.invoiceDate;

    }
    const invoiceDate = new Date(this.invoice.invoiceDate);
    let limitDate: Date;
    limitDate = new Date(this.invoice.invoiceDeadlineDate);
    const time = (limitDate.valueOf() - invoiceDate.valueOf()) / 86400000;
    this.invoice.invoiceDeadlineInNumberOfDays = time;



  }
  changeNumberOfDeadlineDaysNumber() {
    const invoiceDate = new Date(this.invoice.invoiceDate);
    let limitDate: Date;
    limitDate = new Date(this.invoice.invoiceDate);
    limitDate.setDate(invoiceDate.getDate() + this.invoice.invoiceDeadlineInNumberOfDays);
    this.invoice.invoiceDeadlineDate = this.datePipe.transform(limitDate, 'yyyy-MM-dd');
  }

  changeDeadLineDate() {
    const limitDate = new Date(this.invoice.invoiceDeadlineDate);
    const invoiceDate = new Date(this.invoice.invoiceDate);
    const time = (limitDate.valueOf() - invoiceDate.valueOf()) / 86400000;
    this.invoice.invoiceDeadlineInNumberOfDays = time;
  }

}
