import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements OnInit {
  clients: any[];
  loading = false;
  showClientWindow = false;
  client = null;

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
  constructor(private service: SmartTableData, private UtilsService: UtilsServiceService) {
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
    this.initClient();
    this.clients = [
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', customerContacts : []},
      {customerLabel: 'APAC', customerUniqueIdentifier: 'APACO8CO9', customerAddress: 'Heberges de lac 2', customerTel: '+21623262528', customerEmail: 'apac@gmail.com' , customerManagerName: 'Helmi Dammak', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06'},
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', customerContacts : []},
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', customerContacts : []},
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', customerContacts : []},
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', customerContacts : []},
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', customerContacts : []},
      {customerLabel: 'Client A', customerUniqueIdentifier: 'HYUIO8CO9', customerAddress: 'Jardins de l\'aouina 2046 Tunis', customerTel: '+21623262528', customerEmail: 'clientA@gmail.com' , customerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', customerContacts : []},

    ];
  }

  saveNewClient(client) {
    this.hideClientWindow();
    this.UtilsService.showToast('success',
      'Client ajoutée avec succés',
      `Le client  ${this.client.customerLabel} a été ajouté avec succcés`);
  }

  hideClientWindow() {
    this.showClientWindow = false;
  }

  initClient() {
    this.client = {
      customerId: null,
      customerLabel: '',
      customerAddress: '',
      customerUniqueIdentifier: '',
      customerManagerName: '',
      customerTel: '',
      customerEmail: '',
      customerContacts: [],
    };
  }

}
