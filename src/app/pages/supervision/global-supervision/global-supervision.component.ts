import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-global-supervision',
  templateUrl: './global-supervision.component.html',
  styleUrls: ['./global-supervision.component.scss']
})
export class GlobalSupervisionComponent implements OnInit {
  operations = [];
  accounts = [];
  loading = false;
  constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) { }
supervision= {
  account: null,
  startDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  endDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
};
accountInitialAmount = 0;
statusCards = [
  {
      title: 'Montant initial',
      iconClass: 'nb-square-outline',
      type: 'primary',
      value: '0' ,
    
  },
  {
    title: 'Total des encaissements',
    iconClass: 'nb-arrow-dropdown',
    type: 'success',
    value: '0',
  },
  {
    title: 'Total des décaissements',
    iconClass: 'nb-arrow-dropup',
    type: 'danger',
    value: '0',
  },
  {
    title: 'Montant final',
    iconClass: 'nb-checkmark',
    type: 'success',
    value: '0'
  }

];
  ngOnInit(): void {
    this.getAllAccounts();
  }
  supervisionFn() {
    this.accountInitialAmount = this.supervision.account.accountInitialAmount;
    if(this.supervision.account != null) {
      this.statusCards[0].value = '' +  this.accountInitialAmount;
      this.getOperationsBetweenTwoDates();
    }
  }
  getAllAccounts() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
        if(response.length !== 0) {
          this.supervision.account = response[0];
          this.statusCards[0].value = '' +  this.supervision.account.accountInitialAmount;
          this.getOperationsBetweenTwoDates();
        }
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des comptes`);
      });
      

  }
  getOperationsBetweenTwoDates() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_GLOBAL_SUPERVISION + '/' + this.supervision.account.accountId + '/' + this.supervision.startDate
    + '/' + this.supervision.endDate).subscribe( response => {
        context.operations = response;
        let decaissement = 0;
        let encaissement = 0;
        response.array.forEach(element => {
          if(element.opperationType === 'DECAISSEMENT') {
            decaissement = decaissement + element.operationAmount;
          } else {
            encaissement = encaissement + element.operationAmount;
          }
        });
        context.statusCards[1].value = ''+encaissement;
        context.statusCards[2].value = ''+decaissement;
        const finalAmount = this.accountInitialAmount + encaissement - decaissement;
        context.statusCards[3].value = '' + finalAmount;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des opérations`);
      });
  }
  compareAccount(a: any, b: any): boolean {
    if (a==null || b== null) return true;
    return a.accountId === b.accountId;
 }

}
