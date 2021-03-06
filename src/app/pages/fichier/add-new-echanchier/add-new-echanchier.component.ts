import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatepickerComponent} from '../../forms/datepicker/datepicker.component';
import {UtilsServiceService} from '../../../utils-service.service';
import { DatePipe } from '@angular/common';

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
  creditInstitution: '',
  timeLineAccount: null,
  timeLineCreditNumber: null,
  timeLineInitialAmount: 0,
  timeLineAnnityNumber: 1,
  timeLineAnnuity: 'Mensuelle',
  timeLineInterestRate: 0,
  timeLineTable: [],
  timeLineStartDate: null,
};
line = {
  lineDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
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
  constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    if(this.timeLine.timeLineId == null) {
      this.timeLine.timeLineStartDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); 
    } 
    this.initiateLine();
    this.getAllAccounts();
  }
  getAllAccounts() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
        if(response!=null && context.accounts.length !== 0)
        {
         this.timeLine.timeLineAccount=response[0];
        }
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des comptes`);
      });

  }
 initiateLine() {
   this.line = {
     lineDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
     initialAmount: 0,
  initialAmountS: '0',
  interests: 0,
  interestsS: '0',
  tva: 0,
  tvaS: '0',
  total: 0,
  totalS: '0',
   };
   this.line.lineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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
  && this.timeLine.timeLineCreditNumber === '' || this.timeLine.creditInstitution == null || this.timeLine.creditInstitution === '' ||
      this.timeLine.timeLineAnnityNumber == null;
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
    if(element != null && element === line) {

     this.timeLine.timeLineTable.splice(i, 1);
      break;
    }
  }
}

generateTimeLineTable() {
  
}

}
