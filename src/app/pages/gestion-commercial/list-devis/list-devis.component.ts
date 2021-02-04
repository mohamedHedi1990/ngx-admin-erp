import { Component, OnInit } from '@angular/core';
import {SmartTableData} from "../../../@core/data/smart-table";
import {UtilsServiceService} from "../../../utils-service.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'ngx-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.scss']
})
export class ListDevisComponent implements OnInit {

  showDevisTemplate=false;
  showDevisGeneratedWindow=false;
  deviss: any[];
  selectedBL = [];
  devis = null;
  displayDeleteDevis = false;
  titleHeaderInvoice;
  private complet: any;


  constructor(private service: SmartTableData, private utilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initDevis();
    this.getAllDeviss();
  }
  getAllDeviss()
  {
    const context = this;
    this.utilsService.get(UtilsServiceService.API_DEVIS).subscribe( response => {
        context.deviss = response;
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des devis`);
      });
  }

  initDevis()
  {
    this.devis={
      devisId: null,
      devisNumber: '',
      devisDeadlineInNumberOfDays: 0,
      devisCurrency: 'TND',
      devisDeadlineDate: null,
      devisDate: null,
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
      montantDevis: 0,
      devisLines: [],

    }
  }


  generateInvoice(devis) {
    const context = this;
    this.utilsService.post(UtilsServiceService.API_DEVIS,devis).subscribe(response => {
        this.utilsService.showToast('success',
          'Devis Généré avec succé',
          `La Devis a été généré avec succé`);
        this.hideDevisWindow();
        context.getAllDeviss();
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de l'enregistrement de devis générée`);
      });
  }

  hideDevisWindow() {
    this.showDevisGeneratedWindow=false;
  }

  ShowDevisTemplate(devis,complet) {
    this.complet=complet;
    this.initDevis();
    this.devis=devis;
    this.showDevisTemplate=true;
  }

  deleteDevis(devis)
  {
    this.devis=devis;
    this.displayDeleteDevis=true;
  }
  delDevis()
  {
    const context = this;
    this.utilsService.delete(UtilsServiceService.API_DEVIS+"/"+this.devis.devisId).subscribe( response => {
        this.utilsService.showToast('success',
          'devis supprimé avec succés',
          `La devis  ${this.devis.devisNumber} a été supprimé avec succcés`);
        context.getAllDeviss();
        context.initDevis();
        context.displayDeleteDevis = false;
      },
      error => {this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du devis ${this.devis.devisNumber}`);
        context.displayDeleteDevis = false;
      });
  }
  editDevis(devis)
  {
    this.devis=devis;
    this.titleHeaderInvoice="Modifier un devis "+devis.devisNumber;
    this.showDevisGeneratedWindow = true;
  }

  hideTemplateWindow() {
    this.showDevisTemplate=false;
  }

  showDevisWindow() {
    this.initDevis();
    this.showDevisGeneratedWindow = true;
  }

}
