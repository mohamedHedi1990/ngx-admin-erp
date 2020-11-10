import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {UtilsServiceService} from '../../../utils-service.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ListContactsComponent} from '../list-contacts/list-contacts.component';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'ngx-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
  providers: [DialogService],
})
export class ListClientsComponent implements OnInit {
  clients: any[];
  loading = false;
  showClientWindow = false;
  client = null;
  showContactList = false;

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
  constructor(private service: SmartTableData, private UtilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) {
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
     this.getAllClients();
  }
/*
  saveNewClient(client) {
    this.hideClientWindow();
    this.UtilsService.showToast('success',
      'Client ajoutée avec succés',
      `Le client  ${this.client.customerLabel} a été ajouté avec succcés`);
  }
*/
  saveNewClient() {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_CLIENT, this.client).subscribe( response => {
        this.hideClientWindow();
        if ( context.client.customerId == null) {
          this.UtilsService.showToast('success',
            'Client ajouté avec succés',
            `Le client  ${this.client.customerLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Client modfié avec succés',
            `Le client  ${this.client.customerLabel} a été modifié avec succcés`);
        }
        context.getAllClients();
        context.initClient();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde du client ${this.client.customerLabel}`); });

  }

  getAllClients() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_CLIENT).subscribe( response => {
        context.clients = response;
        },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des clients`);
      });

  }
  editClient(client) {
    this.client = client;
    this.showClientWindow = true;
  }

  delClient(client) {
    const context = this;
    const url = UtilsServiceService.API_CLIENT + '/' + client.customerId;
    this.UtilsService.delete(`${UtilsServiceService.API_CLIENT}/${client.customerId}`).subscribe( response => {
        context.clients = response;
        this.UtilsService.showToast('success',
          'Client supprimé avec succés',
          `Le client  ${client.customerLabel} a été supprimé avec succcés`);
        context.getAllClients();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du client ${this.client.customerLabel}`);
      });


  }

  deleteClient(client) {
    this.confirmationService.confirm({
      message: `Voulez vous vraiment supprimer le client ${client.customerLabel}?`,
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      header: `Supprimer un client`,
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delClient(client);
      },
    });

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

  showContacts(client) {
    // const contactModalheader = 'Liste des contacts pour le client ' + client.customerLabel;
    const contactModalheader = 'Liste des contacts';
    const ref = this.dialogService.open(ListContactsComponent, {
      data: {
        contacts: client.customerContacts,
      },
      header: contactModalheader,
      width: '70%',
    });
  }

}
