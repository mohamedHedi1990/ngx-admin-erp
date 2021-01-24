import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SmartTableData } from '../../../@core/data/smart-table';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.scss']
})
export class ListProduitsComponent implements OnInit {
  showProduitWindow = false;
  produits: any[];
  produit = null;
  displayDeleteProduit = false;
  titleHeaderProduit;

  constructor(private service: SmartTableData, private UtilsService: UtilsServiceService,
    public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initProduit();
    this.getAllProduits();
  }
  getAllProduits() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PRODUIT).subscribe( response => {
        context.produits = response;
        },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des produits`);
      });

  }
  initProduit() {
    this.produit = {
      productId: null,
      productLabel: '',
      productReference: '',
      productDescription: '',
      productUrlImage: '',
      productPrixHT:0,
      productTVA:0,
      productFodec:0,
      productTTC:0,
      productUnite:'PIECE',
      productType:'MATERIEL'
    };
  }
  hideProduitWindow() {
    this.showProduitWindow = false;
  }
  saveNewProduit($)
  { console.log("produit to save ");
    console.log(this.produit);
    const context = this;
    this.UtilsService.post(UtilsServiceService.API_PRODUIT, this.produit).subscribe( response => {
        this.hideProduitWindow();
        if ( context.produit.productId == null) {
          this.UtilsService.showToast('success',
            'produit ajouté avec succés',
            `Le produit ${this.produit.productLabel} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'produit modfié avec succés',
            `Le produit  ${this.produit.productLabel} a été modifié avec succcés`);
        }
        context.getAllProduits();
        context.initProduit();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde du produit ${this.produit.productLabel}`); });
  }
  editProduit(produit)
  {
    this.produit = produit;
    this.titleHeaderProduit="Modifier un produit "+produit.productLabel
    this.showProduitWindow = true;
  }
 

  deleteProduit(produit) {
    this.produit = produit;
    this.displayDeleteProduit = true;
 
   }
  delProduit()
  {
    const context = this;
    this.UtilsService.delete(UtilsServiceService.API_PRODUIT+"/"+this.produit.productId).subscribe( response => {
        this.UtilsService.showToast('success',
          'produit supprimé avec succés',
          `Le produit  ${this.produit.productLabel} a été supprimé avec succcés`);
        context.getAllProduits();
        context.initProduit();
        context.displayDeleteProduit = false;
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du produit ${this.produit.productLabel}`);
        context.displayDeleteProduit = false;
      });

  }

  openProduitWindow(){
    this.titleHeaderProduit="Ajouter un nouveau produit"
    this.showProduitWindow=true;
  }
}
