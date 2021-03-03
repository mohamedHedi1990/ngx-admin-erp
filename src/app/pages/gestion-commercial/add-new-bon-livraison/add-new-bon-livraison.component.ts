import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';

@Component({
  selector: 'ngx-add-new-bon-livraison',
  templateUrl: './add-new-bon-livraison.component.html',
  styleUrls: ['./add-new-bon-livraison.component.scss']
})
export class AddNewBonLivraisonComponent implements OnInit {
  @Input() bonLivraison = {
    bonLivraisonId: null,
    bonLivraisonNumber: '',
    bonLivraisonCurrency: 'TND',
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
  blPrefix="";
  blNumber="";
  @Output() addNewBonLivraisonEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  clients = [];
  produits = [];
  maxDateInvoiceDate;
  minDateDeadlineDate;
  timeLine = {
    timeLineId: null,
    timeLineTable: [],
  };
  line = {
    product: {
      productId: null,
      productLabel: '',
      productReference: '',
      productDescription: '',
      productUrlImage: '',
      productPrixHT: 0,
      productTVA: 0,
      productFodec: 0,
      productTTC: 0,
      productUnite: 'PIECE',
      productType: 'MATERIEL'
    },
    quantity: 1,
    remiseTaux:0,
    remiseValeur:null,
    montantHt:null,
    montantHtBrut:null,
    montantTva:null,
    montantFaudec:null,
  };
  produit = null;
  showProduitWindow = false;
  constructor(private UtilsService: UtilsServiceService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    if (this.bonLivraison.bonLivraisonDate == null) {
      this.bonLivraison.bonLivraisonDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }
    this.maxDateInvoiceDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.minDateDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.initiateLine();
    this.getAllCustomers();
    this.getAllProdcuts();
    this.initProduit();
   this.bonLivraison.bonLivraisonLines.forEach(line=>{
     this.timeLine.timeLineTable.push(line)
   })
    if(this.bonLivraison.bonLivraisonId != null && this.bonLivraison.bonLivraisonId != ""){
      this.blPrefix=this.bonLivraison.bonLivraisonNumber.substr(0,8);
      this.blNumber=this.bonLivraison.bonLivraisonNumber.substr(8,4);
    }
  }

  initProduit() {
    this.produit = {
      productId: null,
      productLabel: '',
      productReference: '',
      productDescription: '',
      productUrlImage: '',
      productPrixHT: 0,
      productTVA: 0,
      productFaudec: 0,
      productTTC: 0,
      productUnite: 'PIECE',
      productType: 'MATERIEL'
    };
  }

  getAllCustomers() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_CLIENT).subscribe(response => {
      context.clients = response;
      if (this.clients.length > 0 && this.bonLivraison.customer == null) {
        this.bonLivraison.customer = this.clients[0];
      }
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des clients`);
      });

  }
  getAllProdcuts() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_PRODUIT).subscribe(response => {
      context.produits = response;
      if (this.produit.length > 0) {
        this.line.product = this.produits[0];
      }
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des produits`);
      });

  }
  compareCustomer(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.customerId === b.customerId;
  }


  initiateLine() {
    this.line = {
      product: {
        productId: null,
        productLabel: '',
        productReference: '',
        productDescription: '',
        productUrlImage: '',
        productPrixHT: 0,
        productTVA: 0,
        productFodec: 0,
        productTTC: 0,
        productUnite: 'PIECE',
        productType: 'MATERIEL'
      },
      quantity: 1,
      remiseTaux: 0,
      remiseValeur:null,
      montantHt:null,
      montantHtBrut:null,
      montantTva:null,
      montantFaudec:null,
   };
  }

  deleteLine(i,line) {
    if(line.bonLivraisonLineId != null && line.bonLivraisonLineId != ''){
    this.UtilsService.delete(UtilsServiceService.API_BONLIVRAISONLINE+'/'+ line.bonLivraisonLineId ).subscribe(response => {
      this.timeLine.timeLineTable.splice(i, 1);
      this.calculPrixTotalBonLivraison();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du du Suppression De ligne`);
      });
    }else{
      this.timeLine.timeLineTable.splice(i, 1);
      this.calculPrixTotalBonLivraison();
    }
  }

  addLine() {
    this.line.remiseTaux=this.convertAmount(this.line.remiseTaux);
    this.line.remiseValeur=this.convertAmount(this.line.remiseValeur);
    this.line.montantFaudec=this.convertAmount(this.line.montantFaudec);
    this.line.montantHt=this.convertAmount(this.line.montantHt);
    this.line.montantHtBrut=this.convertAmount(this.line.montantHtBrut);
    this.line.montantTva=this.convertAmount(this.line.montantTva);
    this.timeLine.timeLineTable.push(this.line);
    this.calculPrixTotalBonLivraison();
    this.initiateLine();
  }


  cancel() {
    this.cancelEvent.emit();
  }
  checkGeneratedBonLivraisonValid() {
    return this.bonLivraison.customer == "" || this.bonLivraison.customer == null ||
      this.timeLine.timeLineTable.length == 0;
  }
  saveGeneratedBonLivraison(){
    this.bonLivraison.bonLivraisonLines=this.timeLine.timeLineTable;
    this.bonLivraison.bonLivraisonNumber=this.blPrefix+this.blNumber;
  this.addNewBonLivraisonEvent.emit(this.bonLivraison);
  }
  showProduitModal() {
    this.showProduitWindow = true;
  }

  hideProduitWindow() {
    this.showProduitWindow = false;
  }
  saveNewProduit($) {
    const context = this;
    this.UtilsService.post(UtilsServiceService.API_PRODUIT, this.produit).subscribe(response => {
      this.hideProduitWindow();
      if (context.produit.productId == null) {
        this.UtilsService.showToast('success',
          'produit ajouté avec succés',
          `Le produit ${this.produit.productLabel} a été ajouté avec succcés`);
      } else {
        this.UtilsService.showToast('success',
          'produit modfié avec succés',
          `Le produit  ${this.produit.productLabel} a été modifié avec succcés`);
      }
      context.getAllProdcuts();
      context.initProduit();
    },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la souvegarde du produit ${this.produit.productLabel}`);
      });
  }
  changeProduct(event) {
    this.line.product = event;
    this.calculPrixTotal();
  }


  calculPrixTotal(){
    this.line.montantHtBrut=this.line.product.productPrixHT*this.line.quantity
    this.line.remiseValeur=this.line.montantHtBrut*(this.line.remiseTaux/100);
    this.line.montantHt=this.line.montantHtBrut-this.line.remiseValeur;
    this.line.montantFaudec=this.line.montantHt*(this.line.product.productFodec/100);
    this.line.montantTva=(this.line.montantHt+this.line.montantFaudec)*(this.line.product.productTVA/100);
    this.calculPrixTotalBonLivraison();
  }

  calculPrixTotalEdited(line){
    line.montantHtBrut=line.product.productPrixHT*line.quantity
    line.remiseValeur=line.montantHtBrut*(line.remiseTaux/100);
    line.montantHt=line.montantHtBrut-line.remiseValeur;
    line.montantFaudec=line.montantHt*(line.product.productFodec/100);
    line.montantTva=(line.montantHt+line.montantFaudec)*(line.product.productTVA/100);
    this.calculPrixTotalBonLivraison();
  }

  calculPrixTotalBonLivraison() {
    this.bonLivraison.totalHTBrut = 0;
    this.bonLivraison.totalHT = 0;
    this.bonLivraison.totalTVA = 0;
    this.bonLivraison.totalFodec = 0;
    this.bonLivraison.remise = 0;
    this.bonLivraison.totalTaxe = this.bonLivraison.totalTVA + this.bonLivraison.totalFodec + this.bonLivraison.timbreFiscal;
    this.bonLivraison.totalTTC = this.bonLivraison.totalHT + this.bonLivraison.totalTaxe;

    this.timeLine.timeLineTable.forEach((line) => {
      this.bonLivraison.totalHTBrut += line.montantHtBrut;
      this.bonLivraison.totalHT += line.montantHt;
      this.bonLivraison.totalTVA += line.montantTva;
      this.bonLivraison.totalFodec += line.montantFaudec;
      this.bonLivraison.remise += line.remiseValeur;
      this.bonLivraison.totalTaxe = this.bonLivraison.totalTVA + this.bonLivraison.totalFodec + this.bonLivraison.timbreFiscal;
      this.bonLivraison.totalTTC = this.bonLivraison.totalHT + this.bonLivraison.totalTaxe;
    })
    this.bonLivraison.totalHTBrut=this.convertAmount(this.bonLivraison.totalHTBrut);
    this.bonLivraison.totalHT=this.convertAmount(this.bonLivraison.totalHT);
    this.bonLivraison.totalTVA=this.convertAmount(this.bonLivraison.totalTVA);
    this.bonLivraison.totalFodec=this.convertAmount(this.bonLivraison.totalFodec);
    this.bonLivraison.remise=this.convertAmount(this.bonLivraison.remise);
    this.bonLivraison.totalTaxe=this.convertAmount(this.bonLivraison.totalTaxe);
    this.bonLivraison.totalTTC=this.convertAmount(this.bonLivraison.totalTTC);
  }

convertAmount(amount):any
{
  return amount=Math.round(amount * 1000) / 1000;
}
}
