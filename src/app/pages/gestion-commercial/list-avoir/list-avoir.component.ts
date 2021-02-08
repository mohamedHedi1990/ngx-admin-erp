import { Component, OnInit } from '@angular/core';
import {SmartTableData} from "../../../@core/data/smart-table";
import {UtilsServiceService} from "../../../utils-service.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'ngx-list-avoir',
  templateUrl: './list-avoir.component.html',
  styleUrls: ['./list-avoir.component.scss']
})
export class ListAvoirComponent implements OnInit {

  showAvoirWindow=false;

  showAvoirTemplate=false;
  avoirs: any[];
  avoir = null;
  displayDeleteAvoir = false;
  titleHeaderInvoice;
  private complet: any;


  constructor(private service: SmartTableData, private utilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initAvoir();
    this.getAllAvoirs();
  }
  getAllAvoirs()
  {
    const context = this;
    this.utilsService.get(UtilsServiceService.API_AVOIR).subscribe( response => {
        context.avoirs = response;
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des avoirs`);
      });
  }

  initAvoir()
  {
    this.avoir={
      avoirId: null,
      avoirNumber: '',
      avoirDeadlineInNumberOfDays: 0,
      avoirCurrency: 'TND',
      avoirDeadlineDate: null,
      avoirDate: null,
      customer: null,
      products: null,
      totalHTBrut: 0,
      remise: 0,
      totalHT: 0,
      totalTVA: 0,
      totalFodec: 0,
      totalTaxe: 0,
      timbreFiscal: 0.5,
      totalTTC: 0,
      montantAvoir: 0,
      avoirLines: [],

    }
  }


  ShowAvoirTemplate(avoir,complet) {
    this.complet=complet;
    this.initAvoir();
    this.avoir=avoir;
    this.showAvoirTemplate=true;
  }

  deleteAvoir(avoir)
  {
    this.avoir=avoir;
    this.displayDeleteAvoir=true;
  }

  delAvoir()
  {
    const context = this;
    this.utilsService.delete(UtilsServiceService.API_AVOIR+"/"+this.avoir.avoirId).subscribe( response => {
        this.utilsService.showToast('success',
          'avoir supprimé avec succés',
          `L'avoir  ${this.avoir.avoirNumber} a été supprimé avec succcés`);
        context.getAllAvoirs();
        context.initAvoir();
        context.displayDeleteAvoir = false;
      },
      error => {this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du l'avoir ${this.avoir.avoirNumber}`);
        context.displayDeleteAvoir = false;
      });
  }

  hideTemplateWindow() {
    this.showAvoirTemplate=false;
  }

}
