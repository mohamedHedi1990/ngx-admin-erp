import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
