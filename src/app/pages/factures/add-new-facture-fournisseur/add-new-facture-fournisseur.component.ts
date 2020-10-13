import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import {DatePipe} from '@angular/common';

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
    invoiceRsType: 'VALUE',
    invoiceTotalAmount: 0,

  };
  rsAmount = null;
  @Output() addNewProviderInvoiceEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  providers = [];
  constructor(private UtilsService: UtilsServiceService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.rsAmount = 0;
    // this.invoice.invoiceDate = this.UtilsService.now('yyyy-MM-dd');
	if(this.invoice.invoiceId == null) {
		this.invoice.invoiceDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.invoice.invoiceDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

	} else {

		this.invoice.invoiceDate = this.datePipe.transform(this.invoice.invoiceDate, 'yyyy-MM-dd');
    this.invoice.invoiceDeadlineDate = this.datePipe.transform( this.invoice.invoiceDeadlineDate, 'yyyy-MM-dd');
	}

    this.getAllProviders();
  }

  saveInvoice() {
	  const tempInvoice = this.invoice;
	  tempInvoice.invoiceDate = this.datePipe.transform(this.invoice.invoiceDate, 'yyyy-MM-dd');
		tempInvoice.invoiceDeadlineDate = this.datePipe.transform(this.invoice.invoiceDeadlineDate, 'yyyy-MM-dd');

    this.addNewProviderInvoiceEvent.emit(tempInvoice);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkInvoiceValid(): boolean {
    return this.invoice.invoiceNumber == null || this.invoice.invoiceNumber === '' &&
      this.invoice.provider == null;
  }
  getAllProviders() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER).subscribe( response => {
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
    this.invoice.invoiceTotalAmount = this.rsAmount + this.invoice.invoiceNet;
  }

  change() {
	  const startDate = this.datePipe.transform(this.invoice.invoiceDate, 'yyyy-MM-dd');
	  console.log( startDate);
  }

}
