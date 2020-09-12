import { Component, OnInit } from '@angular/core';
import {SmartTableData} from '../../../@core/data/smart-table';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.scss'],
})
export class ListFournisseursComponent implements OnInit {
  providers: any[];
  loading = false;
  showProviderWindow = false;
  provider = null;
  constructor(private service: SmartTableData, private UtilsService: UtilsServiceService) {
  }
    ngOnInit(): void {
    this.initprovider();
    this.providers = [
      {providerLabel: 'Fournisseur A', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur B', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur C', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur D', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur E', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur F', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur G', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},

    ];
  }

  saveNewProvider(provider) {
    this.hideProviderWindow();
    this.UtilsService.showToast('success',
      'Fournisseur ajoutée avec succés',
      `Le fournisseur  ${this.provider.providerLabel} a été ajouté avec succcés`);
  }

  hideProviderWindow() {
    this.showProviderWindow = false;
  }

  initprovider() {
    this.provider = {
      providerId: null,
      providerLabel: '',
      providerAddress: '',
      providerUniqueIdentifier: '',
      providerManagerName: '',
      providerTel: '',
      providerEmail: '',
      providerContacts: [],
    };
  }

}
