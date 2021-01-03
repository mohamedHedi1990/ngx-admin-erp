import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-rapprochement-bancaire',
  templateUrl: './rapprochement-bancaire.component.html',
  styleUrls: ['./rapprochement-bancaire.component.scss']
})
export class RapprochementBancaireComponent implements OnInit {
  lastRapprochementDate:any;
  operations = [];
  startDate: any;
  accounts = [];
  loading = false;
  constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) { }
  supervision = {
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
      value: '0',

    },
    // {
    //   title: 'Total des encaissements',
    //   iconClass: 'nb-arrow-dropdown',
    //   type: 'success',
    //   value: '0',
    // },
    // {
    //   title: 'Total des décaissements',
    //   iconClass: 'nb-arrow-dropup',
    //   type: 'danger',
    //   value: '0',
    // },
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
    if (this.supervision.account != null) {
      this.getOperationsBetweenTwoDates();
    }
  }
  getAllAccounts() {
    const context = this;
    this.loading = true;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe(response => {
      context.accounts = response;
      if (response.length !== 0) {
        this.supervision.account = response[0];
        this.getFirstDate();
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
    this.UtilsService.get(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE + '/' + this.supervision.account.accountId + '/' + this.supervision.startDate
      + '/' + this.supervision.endDate).subscribe(response => {
        this.operations = this.operations.concat(response);
        console.log("operations");
        console.log(context.operations);
        let decaissement = 0;
        let encaissement = 0;
        let decaissementValid = 0;
        let encaissementValid = 0;
        context.operations.forEach(element => {
          console.log("elemnt");
          console.log(element);
          if (element.opperationType === 'DECAISSEMENT') {
            decaissement = decaissement + element.operationAmount;
          } else {
            encaissement = encaissement + element.operationAmount;
          }

          if (element.opperationType === 'DECAISSEMENT' && element.validated == true) {
            decaissementValid = decaissementValid + element.operationAmount;
          } else if (element.opperationType === 'ENCAISSEMENT' && element.validated == true) {
            encaissementValid = encaissementValid + element.operationAmount;
          }

          //this.operations.push(this.operations);
          //console.log("operations apres modification");
          //console.log(this.operations);
        });


       
        //add by lamia
        this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD + '/findLastRapprochment/' + this.supervision.account.accountId 
        ).subscribe(response => {
          console.log('response historic   ', response);
          this.lastRapprochementDate=response.createdAt;
        },(error)=>{
            console.log("error historic ");
        });

        this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD + '/' + this.supervision.account.accountId + '/' + this.supervision.startDate
        ).subscribe(response => {
          console.log('response    ', response);
          context.statusCards[0].value = this.UtilsService.convertAmountToString('' + response.solde.toFixed(3)+'date de dernière rapprochement:' +this.datePipe.transform(this.lastRapprochementDate, 'dd-MM-yyyy'));
         // context.statusCards[1].value = this.UtilsService.convertAmountToString('' + encaissementValid.toFixed(3));
         // context.statusCards[2].value = this.UtilsService.convertAmountToString('' + decaissementValid.toFixed(3));
          const finalAmount = response.solde + encaissementValid - decaissementValid;
          console.log("solde fin periode :"+this.UtilsService.convertAmountToString('' + finalAmount.toFixed(3)))
          context.statusCards[1].value = this.UtilsService.convertAmountToString('' + finalAmount.toFixed(3));
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
    if (a == null || b == null) return true;
    return a.accountId === b.accountId;
  }
  getFirstDate() {
    this.loading = true;
    this.UtilsService.get(UtilsServiceService.API_HISTORIC_SOLD + '/' + this.supervision.account.accountId
    ).subscribe(response => {
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
    this.UtilsService.put(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE, operation).subscribe(response => {
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
    this.UtilsService.put(UtilsServiceService.API_RAAPROCHEMENT_BANCAIRE + '/validate/' + operation.operationRealType + '/' + operation.operationRealId, operation).subscribe(response => {

      this.UtilsService.showToast('success',
        'Opération validée avec succés',
        `L'opération ${operation.operationLabel} a été validée avec succés`);
      this.getOperationsBetweenTwoDates();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la validation de l'opértion ${operation.operationLabel}`);
      });

  }
  compareTwoDate(d1: any, d2: any) {
    var date1 = Date.parse(d1);
    var date2 = Date.parse(d2);
    return date1 < date2

  }

}
