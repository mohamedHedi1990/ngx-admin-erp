import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-add-new-facture-client',
  templateUrl: './add-new-facture-client.component.html',
  styleUrls: ['./add-new-facture-client.component.scss'],
})
export class AddNewFactureClientComponent implements OnInit {
  @Input() invoice = {
    invoiceId: null,
    invoiceNumber: '',
    customer: null,
    invoiceDate: null,
    invoiceDeadlineDate: null,
    invoiceNet: 0,
    invoiceRs: 0,
    invoiceRsType: 'VALUE',
    invoiceTotalAmount: 0,

  };
  rsAmount = null;
  @Output() addNewCustomerInvoiceEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  clients = [];
  constructor(private UtilsService: UtilsServiceService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.rsAmount = 0;
    this.invoice.invoiceDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.invoice.invoiceDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getAllCustomers();
  }

  saveInvoice() {
    this.addNewCustomerInvoiceEvent.emit(this.invoice);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkInvoiceValid(): boolean {
    return this.invoice.invoiceNumber == null || this.invoice.invoiceNumber === '' &&
      this.invoice.customer == null;
  }
  getAllCustomers() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_CLIENT).subscribe( response => {
        context.clients = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des clients`);
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
}
