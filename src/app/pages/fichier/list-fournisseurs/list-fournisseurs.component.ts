import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.scss'],
})
export class ListFournisseursComponent implements OnInit {
  providers: any[];
  loading = false;
  ngOnInit(): void {
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

}
