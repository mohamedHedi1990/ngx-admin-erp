import {Component, Input, OnInit} from '@angular/core';
import {SmartTableData} from '../../../@core/data/smart-table';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'ngx-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss'],
})
export class ListContactsComponent implements OnInit {
@Input() contacts = [];
loading = false;
  constructor(private service: SmartTableData, public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {

  }


  ngOnInit(): void {
    /*
    this.contacts = [
      { contactName: 'Mohamed El Hedi Boussada', contactPost: 'Ingénieur', contactTel: '25274902', contactEmail: 'mohamedelhadiboussada@gmail.com'},
      { contactName: 'Mohamed El Hedi Boussada', contactPost: 'Ingénieur', contactTel: '25274902', contactEmail: 'mohamedelhadiboussada@gmail.com'},
      { contactName: 'Mohamed El Hedi Boussada', contactPost: 'Ingénieur', contactTel: '25274902', contactEmail: 'mohamedelhadiboussada@gmail.com'},
      { contactName: 'Mohamed El Hedi Boussada', contactPost: 'Ingénieur', contactTel: '25274902', contactEmail: 'mohamedelhadiboussada@gmail.com'},


    ];
    */
    this.contacts = this.config.data.contacts;
  }

}
