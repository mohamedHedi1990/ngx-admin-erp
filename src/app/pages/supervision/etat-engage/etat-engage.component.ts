import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  minStartDate = new Date();
  startDate:any;
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
constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) { 
  // this.tomorrow.setDate(this.today.getDate()+1);
  this.supervision.startDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
}
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
    this.startDate = this.supervision.startDate;

    this.UtilsService.get(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE + '/' + this.supervision.account.accountId + '/' + this.supervision.startDate)
      .subscribe((response) => {
        this.operations = response;
        console.log("sucess raprochement lamia");
        console.log(response);
        console.log("size before concat ");
        console.log(this.operations.length);
        console.log("operations apres concat");
        console.log(this.operations);
        console.log("size after concat");
        console.log(this.operations.length);
      }, (error) => {
        console.log("error raprochement lamia");
      }
      )
    this.UtilsService.get(UtilsServiceService.API_GLOBAL_SUPERVISION + '/' + this.supervision.account.accountId + '/' + this.supervision.startDate
    + '/' + this.supervision.endDate).subscribe( response => {
      this.operations = this.operations.concat(response);
      console.log("operations");
      console.log(context.operations);
      let decaissement = 0;
        let encaissement = 0;
        context.operations.forEach(element => {
          if(element.opperationType === 'DECAISSEMENT') {
            decaissement = decaissement + element.operationAmount;
          } else {
            encaissement = encaissement + element.operationAmount;
          }
        });
        this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD+ '/' + this.supervision.account.accountId + '/' + this.supervision.startDate
       ).subscribe( response => {
         console.log('response    ', response);
         context.statusCards[0].value = this.UtilsService.convertAmountToString(''+ response.solde.toFixed(3));
         context.statusCards[1].value = this.UtilsService.convertAmountToString(''+encaissement.toFixed(3));
         context.statusCards[2].value = this.UtilsService.convertAmountToString(''+decaissement.toFixed(3));

        const finalAmount = response.solde + encaissement - decaissement;
        
        context.statusCards[3].value = this.UtilsService.convertAmountToString('' + finalAmount.toFixed(3));
        this.loading = false;
          },
          error => {
            this.loading = false;
            this.UtilsService.showToast('danger',
              'Erreur interne',
              `Un erreur interne a été produit lors du chargement du montant initial au début de cette période`);
          });

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
 compareTwoDate(d1: any, d2: any) {
  var date1 = Date.parse(d1);
  var date2 = Date.parse(d2);
  return date1 < date2

}
}
