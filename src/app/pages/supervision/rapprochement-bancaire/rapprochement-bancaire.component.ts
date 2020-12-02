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
statusCards = [
  {
      title: 'Solde début période',
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
    title: 'Solde fin période',
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
          this.getOperationsBetweenTwoDates();
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
        context.statusCards[0].value = this.UtilsService.convertAmountToString(''+ response.solde);
        context.statusCards[1].value = this.UtilsService.convertAmountToString(''+encaissement);
        context.statusCards[2].value = this.UtilsService.convertAmountToString(''+decaissement);
        const finalAmount = response.solde + encaissement - decaissement;
        context.statusCards[3].value = this.UtilsService.convertAmountToString('' + finalAmount);
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
   this.UtilsService.put(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE + '/validate/' + operation.operationRealType + '/' + operation.operationRealId, null).subscribe( response => {

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
