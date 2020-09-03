import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import {NbComponentStatus, NbDialogService} from '@nebular/theme';
import {ShowcaseDialogComponent} from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
declare var require: any;
@Component({
  selector: 'ngx-societes',
  templateUrl: './societes.component.html',
  styleUrls: ['./societes.component.scss'],
})
export class SocietesComponent implements OnInit {
  axios = require('axios');
  cmsgs: any[];
  companies: any[] = [];
  cols: { field: string; header: string }[];
  companiesList: any[];
  showCompanyWindow = false;

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  company = {
    campanyId: null,
    campanyName : '',
    campanyAddress: '',
    campanyUniqueIdentifier: '',
    campanyPhoneNumber : '',
    campanyEmail: '',
    companyPictureUrl: '',
  };
  constructor(private UtilsService: UtilsServiceService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.cols = [
      {field: 'campanyName', header: 'Société'},
      {field: 'campanyAddress', header: 'Adresse'},
      {field: 'campanyUniqueIdentifier', header: 'Identifiant'},
      {field: 'campanyPhoneNumber', header: 'Téléphone'},
    ];
    this.getAllCompanies();
  }

  getAllCompanies() {
    const context = this;
    const url = UtilsServiceService.API_COMPANY;

    context.axios.get(url, {
      header : {},
    }).then(response => {
      context.companies = response.data;
    } ).catch(error => {
    });
  }

  hideCompanyWindow() {
    this.showCompanyWindow = false;
  }

  addNewCompany(passedCompany) {
    const context = this;
    const url = UtilsServiceService.API_COMPANY;
    const company = {
      campanyId: passedCompany.campanyId,
      campanyName : passedCompany.campanyName,
      campanyAddress: passedCompany.campanyAddress,
      campanyUniqueIdentifier: passedCompany.campanyUniqueIdentifier,
      campanyPhoneNumber : passedCompany.campanyPhoneNumber,
      campanyEmail: passedCompany.campanyEmail,
      companyPictureUrl: passedCompany.companyPictureUrl,
    };
    const config = {
      headers: { 'Content-Type': 'application/json' },
      // responseType: 'json'
    };

    context.axios.post(url, company, config)
      .then(response => {
        const campanyId = response.data.campanyId;
        const formData = new FormData();
        formData.append('file', passedCompany.companyIllustration);
        const url1  = 'http://localhost:8090/api/file/company/' + campanyId;
        if (passedCompany.companyIllustration != null) {
          context.axios.post(url1, formData, config).then(function(response1) {
            context.getAllCompanies();
            context.showCompanyWindow = false;
            if (passedCompany.campanyId == null) {
              context.UtilsService.showToast('success',
                'Société ajoutée avec succés',
                `La société  ${company.campanyName} a été ajoutée avec succcés`);
            } else {
              context.UtilsService.showToast('success',
                'Société modifiée avec succés',
                `La société  ${company.campanyName} a été modifiée avec succcés`);
            }
            context.initNewCompany();
          }).catch(function(error1) {
            context.UtilsService.showToast('danger',
              'Erreur interne',
              `Un erreur interne a été produit lors de l'enregistrement du logo de la société  ${company.campanyName}`);
          });
        } else {
          context.getAllCompanies();
          context.showCompanyWindow = false;
          if (passedCompany.campanyId == null) {
            context.UtilsService.showToast('success',
              'Société ajoutée avec succés',
              `La société  ${company.campanyName} a été ajoutée avec succcés`);
          } else {
            context.UtilsService.showToast('success',
              'Société modifiée avec succés',
              `La société  ${company.campanyName} a été modifiée avec succcés`);
          }
          context.initNewCompany();
        }
        // context.initNewCompany();
      }, error => {
        if (passedCompany.campanyId == null) {
          context.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de l'ajout de La société  ${company.campanyName}`);
        } else {
          context.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de la modification de La société  ${company.campanyName}`);
        }
        this.initNewCompany();
      });
  }

  modifyCurrentCompany(rowData) {
    this.company = rowData;
  }
  initNewCompany() {
    this. company = {
      campanyId: null,
      campanyName : '',
      campanyAddress: '',
      campanyUniqueIdentifier: '',
      campanyPhoneNumber : '',
      campanyEmail: '',
      companyPictureUrl: '',
    };
  }

  deletecompany(company) {
    const context = this;
    context.axios.delete(UtilsServiceService.API_COMPANY + '/' + company.campanyId)
      .then(response => {
        context.getAllCompanies();
        this.UtilsService.showToast('success',
          'Société supprimée avec succés',
          `La société  ${company.campanyName} a été supprimée avec succcés`);
        context.initNewCompany();

      });
  }

  openDeleteDialog(company) {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: `Supprimer la société ${company.campanyName}`,
        message: `Vous voulez vraiment supprimer la
        société ${company.campanyName} ?`,
      },
    }).onClose.subscribe(isDeleted => {
      if (isDeleted) {
        this.deletecompany(company);
      }
    });
  }
}
