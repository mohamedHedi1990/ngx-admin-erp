import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-liste-echenaciers',
  templateUrl: './liste-echenaciers.component.html',
  styleUrls: ['./liste-echenaciers.component.scss'],
})
export class ListeEchenaciersComponent implements OnInit {
  showEchancierWindow = false;
  echanciers = [];
  loading = false;
  timeLine = {
    timeLineLabel: '',
    timeLineAccount: {
      accountNumber: '',
      accountLabel: '',
      accountCurrency: '',
    },
    timeLineCreditNumber: null,
    timeLineInitialAmount: 0,
    timeLineYearNumber: 1,
    timeLineAnnuity: null,
    timeLineInterestRate: 0,
    timeLineTable: [],
  };
  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
  }

  saveNewEchancier(echeancier) {
    this.hideEchenacierWindow();
    this.echanciers.push(echeancier);
    this.UtilsService.showToast('success',
      'Echénacier ajoutée avec succés',
      `L'échéancier  ${echeancier.timeLineLabel} a été ajouté avec succcés`);
    this.initTimeLine();
  }

  hideEchenacierWindow() {
    this.showEchancierWindow = false;
  }

  initTimeLine() {
    this.timeLine = {
      timeLineLabel: '',
      timeLineAccount: {
        accountNumber: '',
        accountLabel: '',
        accountCurrency: '',
      },
      timeLineCreditNumber: null,
      timeLineInitialAmount: 0,
      timeLineYearNumber: 1,
      timeLineAnnuity: null,
      timeLineInterestRate: 0,
      timeLineTable: [],
    };
  }

  editEcheancier(line) {
    this.timeLine = line;
    this.showEchancierWindow = true;
  }


}
