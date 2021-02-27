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
      date: '',

  },
  {
    title: 'Total des encaissements sur la période',
    iconClass: 'nb-arrow-dropup',
    type: 'success',
    value: '0',
    date: '',
  },
  {
    title: 'Total des décaissements sur la période',
    iconClass: 'nb-arrow-dropdown',
    type: 'danger',
    value: '0',
    date: '',
  },
  {
    title: 'Montant final',
    iconClass: 'nb-checkmark',
    type: 'success',
    value: '0',
    date: '',
  }

];
encaissement = 0;
decaissement = 0;
constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) {
  // this.tomorrow.setDate(this.today.getDate()+1);
  this.supervision.startDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
}
  ngOnInit(): void {
    this.decaissement = 0;
    this.encaissement = 0;
    this.statusCards[1].value = this.UtilsService.convertAmountToString(''+this.encaissement.toFixed(3));
    this.statusCards[2].value = this.UtilsService.convertAmountToString(''+this.decaissement.toFixed(3));
    const finalDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
    this.statusCards[3].date = finalDate;
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
    this.loading = true;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
        if(response.length !== 0) {
          this.supervision.account = response[0];
          //this.getFirstDate();
          this.statusCards[0].value = '' +  this.supervision.account.accountInitialAmount;
          this.statusCards[0].value = this.UtilsService.convertAmountToString(this.statusCards[0].value );
          this.statusCards[3].value = this.statusCards[0].value;
          this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD+ '/' + this.supervision.account.accountId
       ).subscribe( response => {
         console.log('response    ', response);
         context.statusCards[0].date = response.createdAt;
         this.getOperationsBetweenTwoDates();

          },
          error => {
            this.loading = false;
            this.UtilsService.showToast('danger',
              'Erreur interne',
              `Un erreur interne a été produit lors du chargement de la date de dernier rapprochement`);
          });

        }
      },
      error => {
        this.loading = false;
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
        let finalAmount = this.supervision.account.accountInitialAmount;
        context.operations.forEach(element => {
          if(element.opperationType === 'DECAISSEMENT') {
            decaissement = decaissement + element.operationAmount;
            if(!element.validated) {
              finalAmount = finalAmount - element.operationAmount;
            }
          } else {
            encaissement = encaissement + element.operationAmount;
            if(!element.validated) {
              finalAmount = finalAmount + element.operationAmount;
            }
          }
        });
        context.statusCards[1].value = this.UtilsService.convertAmountToString(''+encaissement.toFixed(3));
        context.statusCards[2].value = this.UtilsService.convertAmountToString(''+decaissement.toFixed(3));

      // const finalAmount = this.supervision.account.accountInitialAmount + encaissement - decaissement;

       context.statusCards[3].value = this.UtilsService.convertAmountToString('' + finalAmount.toFixed(3));
       //const finalDate = this.datePipe.transform(new Date(this.supervision.endDate), 'dd-MM-yyyy HH:mm:ss');
       this.statusCards[3].date = this.datePipe.transform(new Date(this.supervision.endDate), 'dd-MM-yyyy');
       this.loading = false;

        /*this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD+ '/' + this.supervision.account.accountId
       ).subscribe( response => {
         console.log('response    ', response);
         context.statusCards[0].value = this.UtilsService.convertAmountToString(''+ response.solde.toFixed(3));

          },
          error => {
            this.loading = false;
            this.UtilsService.showToast('danger',
              'Erreur interne',
              `Un erreur interne a été produit lors du chargement du montant initial au début de cette période`);
          });*/

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
