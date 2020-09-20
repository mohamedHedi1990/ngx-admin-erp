import { Component, OnInit } from '@angular/core';
import {SmartTableData} from '../../../@core/data/smart-table';
import {UtilsServiceService} from '../../../utils-service.service';
import {ListContactsComponent} from '../list-contacts/list-contacts.component';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'ngx-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.scss'],
  providers: [DialogService],
})
export class ListFournisseursComponent implements OnInit {
  providers: any[];
  loading = false;
  showProviderWindow = false;
  provider = null;
  showProviderList = false;
  contactModalheader = 'List des contacts pour le fournisseur ';
  constructor(private service: SmartTableData, private UtilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) {
  }
    ngOnInit(): void {
    this.initProvider();
    /*
    this.providers = [
      {providerLabel: 'Fournisseur A', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur B', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur C', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur D', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur E', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur F', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},
      {providerLabel: 'Fournisseur G', providerUniqueIdentifier: 'HYUIO8CO9', providerAddress: 'Jardins de l\'aouina 2046 Tunis', providerTel: '+21623262528', providerEmail: 'clientA@gmail.com' , providerManagerName: 'Manager of manager', createdAt: '18-05-2020 12:15:30', updatedAt: '20-05-2020 15:30:06', providerContacts : []},

    ];*/
      this.getAllProviders();
  }

  saveNewProvider() {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_PROVIDER, this.provider).subscribe( response => {
        this.hideProviderWindow();
        if ( context.provider.providerUniqueIdentifier == null) {
          this.UtilsService.showToast('success',
            'Fournisseur ajouté avec succés',
            `Le Fournisseur  ${this.provider.providerLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Fournisseur modfié avec succés',
            `Le Fournisseur  ${this.provider.providerLabel} a été modifié avec succcés`);
        }
        context.getAllProviders();
        context.initProvider();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde du Fournisseur ${this.provider.providerLabel}`); });

  }

  getAllProviders() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PROVIDER).subscribe( response => {
        context.providers = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des fournisseurs`);
      });

  }
  editProvider(provider) {
    this.provider = provider;
   this.showProviderWindow = true;
  }


  deleteProvider(provider) {
    this.confirmationService.confirm({
      message: `Voulez vous vraiment supprimer le fournisseur ${provider.providerLabel}?`,
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      header: `Supprimer un fournisseur`,
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delProvider(provider);
      },
    });

  }
  delProvider(provider) {
    const context = this;
    this.UtilsService.delete(`${UtilsServiceService.API_PROVIDER}/${provider.providerId}`).subscribe( response => {
        context.providers = response;
        this.UtilsService.showToast('success',
          'Fournisseur supprimé avec succés',
          `Le fournisseur  ${provider.providerLabel} a été supprimé avec succcés`);
        this.initProvider();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du fournisseur ${provider.providerLabel}`);
        this.initProvider(); });



  }

  hideProviderWindow() {
    this.showProviderWindow = false;
  }

  initProvider() {
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

  showContacts(provider) {
    this.contactModalheader = this.contactModalheader + provider.providerLabel;
    const ref = this.dialogService.open(ListContactsComponent, {
      data: {
        contacts: provider.providerContacts,
      },
      header: this.contactModalheader,
      width: '70%',
    });
  }

}
