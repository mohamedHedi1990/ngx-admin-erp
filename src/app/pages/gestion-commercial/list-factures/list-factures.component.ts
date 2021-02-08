import { Component, OnInit } from '@angular/core';
import {SmartTableData} from "../../../@core/data/smart-table";
import {UtilsServiceService} from "../../../utils-service.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'ngx-list-factures',
  templateUrl: './list-factures.component.html',
  styleUrls: ['./list-factures.component.scss']
})
export class ListFacturesComponent implements OnInit {
  showFactureWindow=false;

  showFactureTemplate=false;
  showFactureGeneratedWindow=false;
  factures: any[];
  facture = null;
  displayDeleteFacture = false;
  titleHeaderInvoice;
  private complet: any;


  constructor(private service: SmartTableData, private utilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initFacture();
    this.getAllFactures();
  }
  getAllFactures()
  {
    const context = this;
    this.utilsService.get(UtilsServiceService.API_FACTURE).subscribe( response => {
        context.factures = response;
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des bons livraison générées`);
      });
  }

  initFacture()
  {
    this.facture={
      factureId: null,
      factureNumber: '',
      factureDeadlineInNumberOfDays: 0,
      factureCurrency: 'TND',
      factureDeadlineDate: null,
      factureDate: null,
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
      montantFacture: 0,
      factureLines: [],

    }
  }


  ShowFactureTemplate(facture,complet) {
    this.complet=complet;
    this.initFacture();
    this.facture=facture;
    this.showFactureTemplate=true;
  }

  deleteFacture(facture)
  {
    this.facture=facture;
    this.displayDeleteFacture=true;
  }

  delFacture()
  {
    const context = this;
    this.utilsService.delete(UtilsServiceService.API_FACTURE+"/"+this.facture.factureId).subscribe( response => {
        this.utilsService.showToast('success',
          'facture supprimé avec succés',
          `La facture  ${this.facture.factureNumber} a été supprimé avec succcés`);
        context.getAllFactures();
        context.initFacture();
        context.displayDeleteFacture = false;
      },
      error => {this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du facture ${this.facture.factureNumber}`);
        context.displayDeleteFacture = false;
      });
  }


  hideTemplateWindow() {
    this.showFactureTemplate=false;
  }

  hideFactureWindow() {
    this.showFactureWindow=false;
  }


  editFacture(facture)
  {
    this.facture=facture;
    this.titleHeaderInvoice="Modifier une facture "+facture.factureNumber;
    this.showFactureWindow = true;
  }

  saveFacture(facture) {
    const context = this;
    this.utilsService.post(UtilsServiceService.API_FACTURE,facture).subscribe(response => {
        this.utilsService.showToast('success',
          'Facture modifiée avec succé',
          `La Facture a été modifié avec succé`);
        this.hideFactureWindow();
        context.getAllFactures();
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de modification de facture`);
      });
  }

  genererAvoir(facture){
      this.utilsService.post(UtilsServiceService.API_AVOIR+'/generer-from-facture',facture.factureId).subscribe(response => {
          this.utilsService.showToast('success',
            'Avoir généré avec succés',
            `L'avoir ${response.avoirNumber} a été généré avec succés`)
          this.getAllFactures();
        },
        error => {
          this.utilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de géneration de l'avoir`);
        });

  }


}
