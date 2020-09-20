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
  interests: 0,
  tva: 0,
  total: 0,
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
     interests: 0,
     tva: 0,
     total: 0,
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
}
}
