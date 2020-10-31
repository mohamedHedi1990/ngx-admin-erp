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
  accountId: null,
  startDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  endDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
};
  ngOnInit(): void {
    this.getAllAccounts();
  }
  supervisionFn() {
    if(this.supervision.accountId != null) {
      this.getOperationsBetweenTwoDates();
    }
  }
  getAllAccounts() {
    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
        if(response.length !== 0) {
          this.supervision.accountId = response[0].accountId;
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
    this.UtilsService.get(UtilsServiceService.API_GLOBAL_SUPERVISION + '/' + this.supervision.accountId + '/' + this.supervision.startDate
    + '/' + this.supervision.endDate).subscribe( response => {
        context.operations = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des opérations`);
      });
  }
}
