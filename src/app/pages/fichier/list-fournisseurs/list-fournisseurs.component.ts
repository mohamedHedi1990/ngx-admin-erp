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
  selectedFile: any = null;
  provider = null;
  showProviderList = false;
  contactModalheader = 'List des contacts pour le fournisseur ';
  displayDeleteProvider = false;
  displayImporterProvider=false;
  showImportButton=false;

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
        if ( context.provider.providerId == null) {
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
    this.provider = provider;
    this.displayDeleteProvider = true;

  }
  delProvider() {
    const context = this;
    this.UtilsService.delete(`${UtilsServiceService.API_PROVIDER}/${this.provider.providerId}`).subscribe( response => {
        context.providers = response;
        this.UtilsService.showToast('success',
          'Fournisseur supprimé avec succés',
          `Le fournisseur  ${this.provider.providerLabel} a été supprimé avec succcés`);
        this.initProvider();
        this.getAllProviders();
        this.displayDeleteProvider = false;
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du fournisseur ${this.provider.providerLabel}`);
        this.initProvider();
    this.displayDeleteProvider = false;
    });



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
    // this.contactModalheader = this.contactModalheader + provider.providerLabel;
    const contactModalheader = 'Liste des contacts';
    const ref = this.dialogService.open(ListContactsComponent, {
      data: {
        contacts: provider.providerContacts,
      },
      header: contactModalheader,
      width: '70%',
    });
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != null) {
      this.showImportButton = true;
    }
  }

  importer() {
    const context = this;
    let formData = new FormData()
    formData.append('file', this.selectedFile)
    this.UtilsService.post(UtilsServiceService.API_PROVIDER + "/import", formData).subscribe(
      (response) => {
        this.UtilsService.showToast('success',
          "Document importé avec succès",
          `La liste des fournisseurs a été importé avec succès`);
        this.showProviderWindow=false;
        this.displayImporterProvider=false
        context.getAllProviders();
      }, (error) => {
        this.UtilsService.showToast('danger',
          "Erreur interne",
          `Un erreur interne a été produit lors de l'import des fournisseurs. Veuillez verifier le format du fichier importé et verifiez bien qu'elle est compatible avec le format requis! `);
      })
  }

  showImportWindow(){
    this.displayImporterProvider=true;
  }

  closeImportWindow() {
    this.selectedFile = null;
    this.displayImporterProvider=false;
  }
}
