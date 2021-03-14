import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-etat-global-engage',
  templateUrl: './etat-global-engage.component.html',
  styleUrls: ['./etat-global-engage.component.scss']
})
export class EtatGlobalEngageComponent implements OnInit {

  operations = [];
  accounts = [];
  loading = false;
  today = new Date();
  tomorrow = new Date();
  minStartDate = new Date();
  supervision = {
    account: null,
    startDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    endDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  };
  accountInitialAmount = 0;
  statusCards = [
    {
      title: 'Total des encaissements sur la période',
      iconClass: 'nb-arrow-dropdown',
      type: 'success',
      value: '0',
      date: '',
    },
    {
      title: 'Total des décaissements sur la période',
      iconClass: 'nb-arrow-dropup',
      type: 'danger',
      value: '0',
      date: '',
    },

  ];
  encaissement = 0;
  decaissement = 0;
  constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) {
    this.supervision.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this.decaissement = 0;
    this.encaissement = 0;
    this.statusCards[0].value = this.UtilsService.convertAmountToString('' + this.encaissement.toFixed(3));
    this.statusCards[1].value = this.UtilsService.convertAmountToString('' + this.decaissement.toFixed(3));
    this.getOperationsBetweenTwoDates();
  }
  getOperationsBetweenTwoDates() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_GLOBAL_ENGAGE +  '/' + this.supervision.startDate
      + '/' + this.supervision.endDate).subscribe(response => {
        context.operations = response;
        let decaissement = 0;
        let encaissement = 0;
        context.operations.forEach(element => {
          if (element.opperationType === 'DECAISSEMENT') {
            decaissement = decaissement + element.operationAmount;
          } else {
            encaissement = encaissement + element.operationAmount;

          }
        });
        context.statusCards[0].value = this.UtilsService.convertAmountToString('' + encaissement.toFixed(3));
        context.statusCards[1].value = this.UtilsService.convertAmountToString('' + decaissement.toFixed(3));

        this.loading = false;

      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des opérations`);
      });
  }



}
