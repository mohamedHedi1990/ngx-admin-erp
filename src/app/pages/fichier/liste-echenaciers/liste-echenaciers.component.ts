import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';

@Component({
  selector: 'ngx-liste-echenaciers',
  templateUrl: './liste-echenaciers.component.html',
  styleUrls: ['./liste-echenaciers.component.scss'],
})
export class ListeEchenaciersComponent implements OnInit {
  showEchancierWindow = false;
  echanciers = [];
  loading = false;
  timeLine = {
    timeLineId: null,
    timeLineLabel: '',
    timeLineAccount: {
      accountNumber: '',
      accountLabel: '',
      accountCurrency: '',
    },
    timeLineCreditNumber: null,
    timeLineInitialAmount: 0,
    timeLineYearNumber: 1,
    timeLineAnnuity: null,
    timeLineInterestRate: 0,
    timeLineTable: [],
  };
  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.getAllTimeLines();
  }

  hideEchenacierWindow() {
    this.showEchancierWindow = false;
  }

  initTimeLine() {
    this.timeLine = {
      timeLineId: null,
      timeLineLabel: '',
      timeLineAccount: {
        accountNumber: '',
        accountLabel: '',
        accountCurrency: '',
      },
      timeLineCreditNumber: null,
      timeLineInitialAmount: 0,
      timeLineYearNumber: 1,
      timeLineAnnuity: null,
      timeLineInterestRate: 0,
      timeLineTable: [],
    };
  }

  editEcheancier(line) {
    this.timeLine = line;
    this.showEchancierWindow = true;
  }

  saveNewEchancier() {

    const context = this;
    this.UtilsService.post(UtilsServiceService.API_TIME_LINE, this.timeLine).subscribe( response => {
        this.hideEchenacierWindow();
        if ( context.timeLine.timeLineId == null) {
          this.UtilsService.showToast('success',
            'Echéancier ajouté avec succés',
            `L'échéancier  ${this.timeLine.timeLineLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Echéancier modfié avec succés',
            `L'échéancier  ${this.timeLine.timeLineLabel} a été modifié avec succcés`);
        }
        context.getAllTimeLines();
        context.initTimeLine();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde de l'échénacier ${this.timeLine.timeLineLabel}`); });

  }

  getAllTimeLines() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_TIME_LINE).subscribe( response => {
        context.echanciers = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des échéanciers`);
      });

  }


  deleteTimeLine(timeLine) {
    const context = this;
    this.UtilsService.delete(`${UtilsServiceService.API_TIME_LINE}/${timeLine.timeLineId}`).subscribe( response => {
        context.echanciers = response;
        this.UtilsService.showToast('success',
          'Echéancier supprimé avec succés',
          `L'échéancier  ${timeLine.timeLineLabel} a été supprimé avec succcés`);
        this.initTimeLine();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression de l'échéancier ${timeLine.timeLineLabel}`);
        this.initTimeLine(); });



  }


}
