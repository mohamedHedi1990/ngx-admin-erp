import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-rapprochement-bancaire',
  templateUrl: './rapprochement-bancaire.component.html',
  styleUrls: ['./rapprochement-bancaire.component.scss']
})
export class RapprochementBancaireComponent implements OnInit {

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
minStartDate = new Date();
statusCards = [
  {
      title: 'Solde début période',
      iconClass: 'nb-square-outline',
      type: 'primary',
      value: '0' ,
      date: '',

  },
  {
    title: 'Encaissements rapprochés',
    iconClass: 'nb-arrow-dropdown',
    type: 'success',
    value: '0',
    date: '',
  },
  {
    title: 'Décaissements rapprochés',
    iconClass: 'nb-arrow-dropup',
    type: 'danger',
    value: '0',
    date: '',
  },
  {
    title: 'Solde fin période',
    iconClass: 'nb-checkmark',
    type: 'success',
    value: '0',
    date: '',
  }

];
decaissementValid = 0;
encaissementValid = 0;
  ngOnInit(): void {
    this.decaissementValid = 0;
    this.encaissementValid = 0;
    this.statusCards[1].value = this.UtilsService.convertAmountToString(''+this.encaissementValid.toFixed(3));
    this.statusCards[2].value = this.UtilsService.convertAmountToString(''+this.decaissementValid.toFixed(3));
    const finalDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
    this.statusCards[3].date = finalDate;
    this.getAllAccounts();
  }
  supervisionFn() {
    this.accountInitialAmount = this.supervision.account.accountInitialAmount;
    if(this.supervision.account != null) {
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
    this.loading = true;
    this.UtilsService.get(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE + '/' + this.supervision.account.accountId + '/' + this.supervision.startDate
    + '/' + this.supervision.endDate).subscribe( response => {
        context.operations = response;
        /*let decaissement = 0;
        let encaissement = 0;
        let decaissementValid = 0;
          let encaissementValid = 0;
        context.operations.forEach(element => {
          console.log("elemnt");
          console.log(element);
          if(element.opperationType === 'DECAISSEMENT' ) {
            decaissement = decaissement + element.operationAmount;
          } else  {
            encaissement = encaissement + element.operationAmount;
          }

          if(element.opperationType === 'DECAISSEMENT' && element.validated==true ) {
            decaissementValid = decaissementValid + element.operationAmount;
          } else if(element.opperationType === 'ENCAISSEMENT' && element.validated==true) {
            encaissementValid = encaissementValid + element.operationAmount;
          }

        });


       const finalAmount = this.supervision.account.accountInitialAmount + encaissementValid - decaissementValid;

       context.statusCards[3].value = this.UtilsService.convertAmountToString('' + finalAmount.toFixed(3));*/

this.loading = false;

        /*this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD+ '/' + this.supervision.account.accountId + '/' + this.supervision.startDate
       ).subscribe( response => {
         console.log('response    ', response);
         context.statusCards[0].value = this.UtilsService.convertAmountToString(''+ response.solde.toFixed(3));

        this.loading = false;
          },
          error => {
            this.loading = false;
            this.UtilsService.showToast('danger',
              'Erreur interne',
              `Un erreur interne a été produit lors du chargement du montant initial au début de cette période`);
          });*/

      },
      error => {
      this.loading = false;
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des opérations`);
      });
  }
  compareAccount(a: any, b: any): boolean {
    if (a==null || b== null) return true;
    return a.accountId === b.accountId;
 }
 getFirstDate() {
  this.loading = true;
  this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD+ '/' + this.supervision.account.accountId
  ).subscribe( response => {
    console.log('response    ', response);
     this.minStartDate = response.date;
   this.loading = false;

     },
     error => {
       this.loading = false;
       this.UtilsService.showToast('danger',
         'Erreur interne',
         `Un erreur interne a été produit lors du chargement du montant initial au début de cette période`);
     });

}
 changeOperationAmount(operation) {
  const context = this;
  this.loading = true;
    this.UtilsService.put(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE , operation).subscribe( response => {
        this.getOperationsBetweenTwoDates();

      },
      error => {
        this.loading = false;
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la modification du montant de l'opération`);
      });
 }

 rapprocherOperation(operation) {
   const context = this;
   this.UtilsService.put(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE + '/validate/' + operation.operationRealType + '/' + operation.operationRealId, operation).subscribe( response => {
    if(operation.opperationType === 'DECAISSEMENT' ) {
      this.decaissementValid = this.decaissementValid + operation.operationAmount;
    } else  {
      this.encaissementValid = this.encaissementValid + operation.operationAmount;
    }
    this.statusCards[1].value = this.UtilsService.convertAmountToString(''+this.encaissementValid.toFixed(3));
    this.statusCards[2].value = this.UtilsService.convertAmountToString(''+this.decaissementValid.toFixed(3));
    const finalAmount = this.supervision.account.accountInitialAmount + this.encaissementValid - this.decaissementValid;

    this.statusCards[3].value = this.UtilsService.convertAmountToString('' + finalAmount.toFixed(3));
    const finalDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
    this.statusCards[3].date = finalDate;
    this.UtilsService.showToast('success',
         'Opération validée avec succés',
         `L'opération ${operation.operationLabel} a été validée avec succés`);

       this.getOperationsBetweenTwoDates();
     },
     error => {this.UtilsService.showToast('danger',
       'Erreur interne',
       `Un erreur interne a été produit lors de la validation de l'opértion ${operation.operationLabel}`);
     });

 }

}
