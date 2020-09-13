import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-add-new-echanchier',
  templateUrl: './add-new-echanchier.component.html',
  styleUrls: ['./add-new-echanchier.component.scss']
})
export class AddNewEchanchierComponent implements OnInit {
@Input() timeLine = {
  timeLineLabel: '',
  timeLineAccount: {
    accountNumber: '',
    accountLabel: '',
    accountCurrency: ''
  },
  timeLineCreditNumber: null,
  timeLineInitialAmount: 0,
  timeLineYearNumber: 1,
  timeLineAnnuity: null,
  timeLineInterestRate: 0,
};
  constructor() { }

  ngOnInit(): void {
  }

}
