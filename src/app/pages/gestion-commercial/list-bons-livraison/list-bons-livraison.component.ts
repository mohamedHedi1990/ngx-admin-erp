import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SmartTableData } from '../../../@core/data/smart-table';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-list-bons-livraison-generer',
  templateUrl: './list-bons-livraison.component.html',
  styleUrls: ['./list-bons-livraison.component.scss']
})
export class ListBonsLivraisonComponent implements OnInit {
  showBonLivraisonTemplate=false;
  showBonLivraisonGeneratedWindow=false;
  bonLivraisons: any[];
  selectedBL = [];
  bonLivraison = null;
  displayDeleteBonLivraison = false;
  titleHeaderInvoice;
  private complet: any;


  constructor(private service: SmartTableData, private utilsService: UtilsServiceService,
    public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initBonLivraison();
    this.getAllBonLivraisons();
  }
  getAllBonLivraisons()
  {
    const context = this;
    this.utilsService.get(UtilsServiceService.API_BONLIVRAISON).subscribe( response => {
        context.bonLivraisons = response;
        },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des bons livraison générées`);
      });
  }

  initBonLivraison()
  {
    this.bonLivraison={
      bonLivraisonId: null,
      bonLivraisonNumber: '',
      bonLivraisonDeadlineInNumberOfDays: 0,
      bonLivraisonCurrency: 'TND',
      bonLivraisonDeadlineDate: null,
      bonLivraisonDate: null,
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
      montantBonLivraison: 0,
      bonLivraisonLines: [],

    }
  }


  generateInvoice(bonLivraison) {
    const context = this;
    this.utilsService.post(UtilsServiceService.API_BONLIVRAISON,bonLivraison).subscribe(response => {
      this.utilsService.showToast('success',
        'BonLivraison Généré avec succé',
        `La BonLivraison a été généré avec succé`);
         this.hideBonLivraisonWindow();
         context.getAllBonLivraisons();
       },
       error => {
         this.utilsService.showToast('danger',
           'Erreur interne',
           `Un erreur interne a été produit lors de l'enregistrement de bon livraison générée`);
       });
  }

  hideBonLivraisonWindow() {
    this.showBonLivraisonGeneratedWindow=false;
  }

  ShowBonLivraisonTemplate(bonLivraison,complet) {
    this.complet=complet;
    this.initBonLivraison();
    this.bonLivraison=bonLivraison;
    this.showBonLivraisonTemplate=true;
  }

  deleteBonLivraison(bonLivraison)
  {
    this.bonLivraison=bonLivraison;
    this.displayDeleteBonLivraison=true;
  }
  delBonLivraison()
  {
    const context = this;
    this.utilsService.delete(UtilsServiceService.API_BONLIVRAISON+"/"+this.bonLivraison.bonLivraisonId).subscribe( response => {
        this.utilsService.showToast('success',
          'bon livraison supprimé avec succés',
          `La bon livraison  ${this.bonLivraison.bonLivraisonNumber} a été supprimé avec succcés`);
        context.getAllBonLivraisons();
        context.initBonLivraison();
        context.displayDeleteBonLivraison = false;
      },
      error => {this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du bon livraison ${this.bonLivraison.bonLivraisonNumber}`);
        context.displayDeleteBonLivraison = false;
      });
  }
  editBonLivraison(bonLivraison)
  {
    this.bonLivraison=bonLivraison;
    this.titleHeaderInvoice="Modifier un bon livraison "+bonLivraison.bonLivraisonNumber;
    this.showBonLivraisonGeneratedWindow = true;
  }

  hideTemplateWindow() {
    this.showBonLivraisonTemplate=false;
  }

  showBonLivraisonWindow() {
    this.initBonLivraison();
    this.showBonLivraisonGeneratedWindow = true;
  }

  genererFacture(){
    let blsId=[];
    this.selectedBL.forEach(value => {
      blsId.push(value.bonLivraisonId);
    })
    const context = this;
    this.utilsService.post(UtilsServiceService.API_FACTURE,blsId).subscribe(response => {
        this.utilsService.showToast('success',
          'Facture Généré avec succé',
          `La Facture a été généré avec succé`)
          this.selectedBL = [];
      this.getAllBonLivraisons();
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de géneration du facture`);
      });
  }
}
