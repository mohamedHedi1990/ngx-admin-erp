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
  showAvoirWindow=false;
  showAvoirTemplate=false;
  showFactureTemplate=false;
  showFactureGeneratedWindow=false;
  factures: any[];
  facture = null;
  avoir = null;

  displayDeleteFacture = false;
  displayGenererAvoir=false;
  titleHeaderInvoice;
  private complet: any;


  constructor(private service: SmartTableData, private utilsService: UtilsServiceService,
              public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initFacture();
    this.initAvoir();
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
      factureType:'FACTURE',
    }
  }

  initAvoir()
  {
    this.avoir={
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
      factureType:'AVOIR',
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
      if(this.facture.factureType=='FACTURE') {
        this.utilsService.showToast('success',
          'Facture supprimé avec succés',
          `La facture  ${this.facture.factureNumber} a été supprimé avec succcés`);
      }else{
        this.utilsService.showToast('success',
          'Avoir supprimé avec succés',
          `L'avoir  ${this.facture.factureNumber} a été supprimé avec succcés`);
      }
        context.getAllFactures();
        context.initFacture();
        context.displayDeleteFacture = false;
      },
      error => {
        if (this.facture.factureType == 'FACTURE') {
          this.utilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de la suppression du facture ${this.facture.factureNumber}`);
        }else{
          this.utilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de la suppression du l'avoir ${this.facture.factureNumber}`);

        }
        context.displayDeleteFacture = false;
      });
  }


  hideTemplateWindow() {
    this.showFactureTemplate=false;
    this.showAvoirTemplate=false;
  }

  hideFactureWindow() {
    this.showFactureWindow=false;
  }
  hideAvoirWindow() {
    this.showAvoirWindow=false;
  }


  editFacture(facture)
  {
    this.facture=Object.assign(this.facture,facture);
    this.titleHeaderInvoice="Modifier une facture "+facture.factureNumber;
    this.showFactureWindow = true;
  }


  genererAvoir(facture)
  {
    this.avoir=Object.assign(this.avoir,facture);
    this.avoir.factureId=null;
    this.avoir.factureType='AVOIR';
    this.avoir.factureNumber=null;
    this.avoir.createdAt=null;
    this.avoir.factureLines.forEach(factureLine => {
      factureLine.factureLineId=null;
      factureLine.facture=null;
      });
    //this.titleHeaderInvoice="Modifier une facture "+facture.factureNumber;
    this.showAvoirWindow = true;
  }

  editAvoir(facture)
  {
    this.avoir=Object.assign(this.avoir,facture);
    this.showAvoirWindow = true;
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
        if(error.status == 409){
          this.utilsService.showToast('danger',
            'Facture existe',
            `Il existe une facture avec le numero ${facture.factureNumber}`);
        }else {
          this.utilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de modification de facture`);
        }
      });
  }

  saveAvoir(avoir) {
    const context = this;
    this.utilsService.post(UtilsServiceService.API_FACTURE,avoir).subscribe(response => {
      if(avoir.factureId == null){
        this.utilsService.showToast('success',
          'Avoir ajouté avec succès',
          `L'avoir a été ajouté avec succès`);
      }else{

        this.utilsService.showToast('success',
          'Avoir modifié avec succès',
          `L'avoir a été modifié avec succès`);
      }
        this.hideAvoirWindow();
        context.getAllFactures();
      },
      error => {
        if(error.status == 409){
          this.utilsService.showToast('danger',
            'Avoir existe',
            `Il existe un avoir avec le numero ${avoir.factureNumber}`);
        }else {
          this.utilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de modification de l'avoir`);
        }
      });
  }

}
