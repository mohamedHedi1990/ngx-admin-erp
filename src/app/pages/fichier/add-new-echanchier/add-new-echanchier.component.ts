import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatepickerComponent} from '../../forms/datepicker/datepicker.component';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-add-new-echanchier',
  templateUrl: './add-new-echanchier.component.html',
  styleUrls: ['./add-new-echanchier.component.scss'],
})
export class AddNewEchanchierComponent implements OnInit {
  @Output() addNewEchenacierEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
@Input() timeLine = {
  timeLineId: null,
  timeLineLabel: '',
  timeLineAccount: null,
  timeLineCreditNumber: null,
  timeLineInitialAmount: 0,
  timeLineYearNumber: 1,
  timeLineAnnuity: null,
  timeLineInterestRate: 0,
  timeLineTable: [],
};
line = {
  lineDate: new Date(Date.now()),
  initialAmount: 0,
  initialAmountS: '0',
  interests: 0,
  interestsS: '0',
  tva: 0,
  tvaS: '0',
  total: 0,
  totalS: '0',
};
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      date: {
        title: 'Date échéance',
        filter: false,
        type: 'custom',
        renderComponent:  DatepickerComponent ,
        width: '250px',
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component:  DatepickerComponent ,
        },
      },
      principalAmount: {
        title: 'Echéance principale',
        type: 'number',
        filter: false,
      },
      interest: {
        title: 'Intérets',
        type: 'number',
        filter: false,
      },
      tva: {
        title: 'TVA',
        type: 'number',
        filter: false,
      },
      totalAmount: {
        title: 'Toatal anuiité',
        type: 'number',
        filter: false,
      },
    },
  };
  accounts = [];
  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.initiateLine();
    this.getAllAccounts();
  }
  getAllAccounts() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des comptes`);
      });

  }
 initiateLine() {
   this.line = {
     lineDate: new Date(Date.now()),
     initialAmount: 0,
  initialAmountS: '0',
  interests: 0,
  interestsS: '0',
  tva: 0,
  tvaS: '0',
  total: 0,
  totalS: '0',
   };
   this.line.lineDate = new Date();
 }
 addLine() { 
    this.timeLine.timeLineTable.push(this.line);
    this.initiateLine();
 }
  saveEcenachier() {
    this.addNewEchenacierEvent.emit(this.timeLine);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  onChangeCompteLabel() {
    this.timeLine.timeLineAccount.accountCurrency = 'TND';
    this.timeLine.timeLineAccount.accountNumber = '12345TYU7';
  }
updateTotalAmount(line?) {
    if (line == null) line = this.line;
    line.total = line.initialAmount + line.interests + line.tva;
    line.total = line.total.toFixed(3);
    line.totalS = this.UtilsService.convertAmountToString('' +line.total);
}

checkTimeLineValid(): boolean {
    return this.timeLine.timeLineAccount == null || this.timeLine.timeLineAnnuity == null ||
      this.timeLine.timeLineInterestRate == null || this.timeLine.timeLineInitialAmount == null || this.timeLine.timeLineCreditNumber == null
  && this.timeLine.timeLineCreditNumber === '' || this.timeLine.timeLineLabel == null || this.timeLine.timeLineLabel === '' ||
      this.timeLine.timeLineYearNumber == null;
}

onChangeInitialAmount(line?) {
  if (line == null) line = this.line;
  line.initialAmountS = this.UtilsService.convertAmountToString('' +line.initialAmount);
}
onChangeInterests(line?) {
  if (line == null) line = this.line;
  line.interestsS = this.UtilsService.convertAmountToString('' + line.interests);
}
onChangeTva(line?) {
  if (line == null) line = this.line;
  line.tvaS = this.UtilsService.convertAmountToString('' + line.tva);
}

deleteLine(line) {
  for(let i=0; i<this.timeLine.timeLineTable.length ; i++) {
    const element = this.timeLine.timeLineTable[i];
    if(element.timeLineEntryId != null && element.timeLineEntryId === line.timeLineEntryId) {
     this.timeLine.timeLineTable.splice(i, 1);
      break;
    }
  }
}

}
