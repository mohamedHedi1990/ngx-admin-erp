import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { UtilsServiceService } from '../../../utils-service.service';
@Component({
  selector: 'ngx-etat-engage',
  templateUrl: './etat-engage.component.html',
  styleUrls: ['./etat-engage.component.scss']
})
export class EtatEngageComponent implements OnInit {

  operations = [];
  accounts = [];
  loading = false;
  today = new Date();
  tomorrow = new Date() ;
 constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) { 
  this.tomorrow.setDate(this.today.getDate()+1);
  console.log(this.tomorrow);
  this.supervision.startDate = this.datePipe.transform(this.tomorrow,'yyyy-MM-dd');
  let x = 2.964024578;
let res = x.toFixed(3);
console.log(res);
 }
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
      this.statusCards[0].value = this.UtilsService.convertAmountToString('' +  this.accountInitialAmount);
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
          this.statusCards[0].value = this.UtilsService.convertAmountToString(this.statusCards[0].value );
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
        context.operations.forEach(element => {
          if(element.opperationType === 'DECAISSEMENT') {
            decaissement = decaissement + element.operationAmount;
          } else {
            encaissement = encaissement + element.operationAmount;
          }
        });
        context.statusCards[1].value = this.UtilsService.convertAmountToString(''+encaissement.toFixed(3));
        context.statusCards[2].value = this.UtilsService.convertAmountToString(''+decaissement.toFixed(3));
        const finalAmount = this.accountInitialAmount + encaissement - decaissement;
        context.statusCards[3].value = this.UtilsService.convertAmountToString('' + finalAmount.toFixed(3));
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
