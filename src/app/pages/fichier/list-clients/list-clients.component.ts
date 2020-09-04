import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements OnInit {
  clients: any[];
  loading = false;
  /*
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
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
*/
  constructor(private service: SmartTableData) {
    // const data = this.service.getData();
   //  this.source.load(data);
  }

  /*
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
*/
  ngOnInit(): void {
    this.clients = [
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
    ]
  }

}
