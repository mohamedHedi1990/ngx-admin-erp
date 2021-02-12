import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-add-avoir',
  templateUrl: './add-avoir.component.html',
  styleUrls: ['./add-avoir.component.scss']
})
export class AddAvoirComponent implements OnInit {

  @Input() avoir = {
    factureId: null,
    factureNumber: '',
    factureCurrency: 'TND',
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
    factureDeadlineDate:null,
    factureDeadlineInNumberOfDays:0,
    factureType:'AVOIR',
  }
  @Output() editAvoirEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  clients = [];
  produits = [];
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
    this.initiateLine();
    this.getAllCustomers();
    this.getAllProdcuts();
    this.initProduit();
    this.avoir.factureLines.forEach(line=>{
      this.timeLine.timeLineTable.push(line)
    })
    this.calculPrixTotalAvoir();
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
        if (this.clients.length > 0) {
          this.avoir.customer = this.clients[0];
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

  compareCurrency(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a === b;
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
    if(line.factureLineId != null && line.factureLineId != ''){
      this.UtilsService.delete(UtilsServiceService.API_FACTURELINE+'/'+ line.factureLineId ).subscribe(response => {
          this.timeLine.timeLineTable.splice(i, 1);
          this.calculPrixTotalAvoir();
        },
        error => {
          this.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors du Suppression De ligne`);
        });
    }else{
      this.timeLine.timeLineTable.splice(i, 1);
      this.calculPrixTotalAvoir();
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
    this.calculPrixTotalAvoir();
    this.initiateLine();
  }

  cancel() {
    this.cancelEvent.emit();
  }
  checkGeneratedAvoirValid() {
    return  this.avoir.customer == "" || this.avoir.customer == null ||
      this.timeLine.timeLineTable.length == 0;
  }
  saveGeneratedAvoir(){
    this.avoir.factureLines=this.timeLine.timeLineTable;
    this.editAvoirEvent.emit(this.avoir);
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

  calculPrixTotal(){
    this.line.montantHtBrut=this.line.product.productPrixHT*this.line.quantity
    this.line.remiseValeur=this.line.montantHtBrut*(this.line.remiseTaux/100);
    this.line.montantHt=this.line.montantHtBrut-this.line.remiseValeur;
    this.line.montantFaudec=this.line.montantHt*(this.line.product.productFodec/100);
    this.line.montantTva=(this.line.montantHt+this.line.montantFaudec)*(this.line.product.productTVA/100);
    this.calculPrixTotalAvoir();
  }

  calculPrixTotalEdited(line){
    line.montantHtBrut=line.product.productPrixHT*line.quantity
    line.remiseValeur=line.montantHtBrut*(line.remiseTaux/100);
    line.montantHt=line.montantHtBrut-line.remiseValeur;
    line.montantFaudec=line.montantHt*(line.product.productFodec/100);
    line.montantTva=(line.montantHt+line.montantFaudec)*(line.product.productTVA/100);
    this.calculPrixTotalAvoir();
  }

  calculPrixTotalAvoir() {
    this.avoir.totalHTBrut = 0;
    this.avoir.totalHT = 0;
    this.avoir.totalTVA = 0;
    this.avoir.totalFodec = 0;
    this.avoir.remise = 0;
    this.avoir.totalTaxe = this.avoir.totalTVA + this.avoir.totalFodec + this.avoir.timbreFiscal;
    this.avoir.totalTTC = this.avoir.totalHT + this.avoir.totalTaxe;

    this.timeLine.timeLineTable.forEach((line) => {
      this.avoir.totalHT += line.montantHt;
      this.avoir.totalTVA += line.montantTva;
      this.avoir.totalFodec += line.montantFaudec;
      this.avoir.totalTaxe = this.avoir.totalTVA + this.avoir.totalFodec + this.avoir.timbreFiscal;
      this.avoir.totalTTC = this.avoir.totalHT + this.avoir.totalTaxe;
    }
  )
    this.avoir.remise = this.avoir.totalHT * (-1);
    this.avoir.totalHTBrut=this.convertAmount(this.avoir.totalHTBrut);
    this.avoir.totalHT=this.convertAmount(this.avoir.totalHT);
    this.avoir.totalTVA=this.convertAmount(this.avoir.totalTVA);
    this.avoir.totalFodec=this.convertAmount(this.avoir.totalFodec);
    this.avoir.remise=this.convertAmount(this.avoir.remise);
    this.avoir.totalTaxe=this.convertAmount(this.avoir.totalTaxe);
    this.avoir.totalTTC=this.convertAmount(this.avoir.totalTTC);
  }

  convertAmount(amount):any
  {
    return amount=Math.round(amount * 1000) / 1000;
  }

}
