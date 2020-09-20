import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import {SmartTableData} from '../../../@core/data/smart-table';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'ngx-list-societes',
  templateUrl: './list-societes.component.html',
  styleUrls: ['./list-societes.component.scss'],
})
export class ListSocietesComponent implements OnInit {

  societes: any[];
  loading = false;
  showSocieteWindow = false;
  societe = null;



  constructor(private service: SmartTableData, private UtilsService: UtilsServiceService,
              public dialogService: DialogService) {

  }


  ngOnInit(): void {
    this.initSociete();

    this.getAllSocietes();
  }

  saveNewSociete() {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_COMPANY, this.societe).subscribe( response => {
        this.hideSocieteWindow();
        if ( context.societe.campanyId == null) {
          this.UtilsService.showToast('success',
            'societe ajoutée avec succés',
            `Le societe  ${this.societe.campanyName} a été ajoutée avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'societe modfiée avec succés',
            `Le societe  ${this.societe.campanyName} a été modifiée avec succcés`);
        }
        context.getAllSocietes();
        context.initSociete();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde du societe ${this.societe.campanyName}`); });

  }

  getAllSocietes() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_COMPANY).subscribe( response => {
        context.societes = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des societes`);
      });

  }
  editSociete(societe) {
    this.societe = societe;
    this.showSocieteWindow = true;
  }


  deleteSociete(societe) {
    const context = this;
    const url = UtilsServiceService.API_COMPANY + '/' + societe.campanyId;
    this.UtilsService.delete(`${UtilsServiceService.API_COMPANY}/${societe.campanyId}`).subscribe( response => {
        context.societes = response;
        this.UtilsService.showToast('success',
          'societe supprimé avec succés',
          `Le societe  ${societe.campanyName} a été supprimé avec succcés`);
        context.getAllSocietes();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du societe ${this.societe.campanyName}`);
      });



  }

  hideSocieteWindow() {
    this.showSocieteWindow = false;
  }

  initSociete() {
    this.societe = {
      campanyId: null,
      campanyName: '',
      companyManagerName: '',
      customerAddress: '',
      campanyUniqueIdentifier: '',
      campanyPhoneNumber: '',
      companyIllustration: '',
      campanyEmail: '',
      companyPictureUrl: [],
    };
  }

}
