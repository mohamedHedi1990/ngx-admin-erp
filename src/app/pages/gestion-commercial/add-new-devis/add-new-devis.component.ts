import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-add-new-devis',
  templateUrl: './add-new-devis.component.html',
  styleUrls: ['./add-new-devis.component.scss']
})
export class AddNewDevisComponent implements OnInit {

  @Input() devis = {
    devisId: null,
    devisNumber: '',
    devisCurrency: 'TND',
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
    devisDeadlineDate:null,
    devisDeadlineInNumberOfDays:0,
  }
  @Output() addNewDevisEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  clients = [];
  produits = [];
  maxDateDevisDate;
  minDevisDeadllineDate;

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
    this.devis.devisDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.devis.devisDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDateDevisDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.minDevisDeadllineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.initiateLine();
    this.getAllCustomers();
    this.getAllProdcuts();
    this.initProduit();
    this.devis.devisLines.forEach(line=>{
      this.timeLine.timeLineTable.push(line)
    })
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
          this.devis.customer = this.clients[0];
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
    if(line.devisLineId != null && line.devisLineId != ''){
      this.UtilsService.delete(UtilsServiceService.API_DEVISLINE+'/'+ line.devisLineId ).subscribe(response => {
          this.timeLine.timeLineTable.splice(i, 1);
          this.calculPrixTotalDevis();
        },
        error => {
          this.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors du du Suppression De ligne`);
        });
    }else{
      this.timeLine.timeLineTable.splice(i, 1);
      this.calculPrixTotalDevis();
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
    this.calculPrixTotalDevis();
    this.initiateLine();
  }


  cancel() {
    this.cancelEvent.emit();
  }
  checkGeneratedDevisValid() {
    return this.devis.customer == "" || this.devis.customer == null ||
      this.timeLine.timeLineTable.length == 0;
  }
  saveGeneratedDevis(){
    this.devis.devisLines=this.timeLine.timeLineTable;
    this.addNewDevisEvent.emit(this.devis);
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
    this.calculPrixTotalDevis();
  }

  calculPrixTotalEdited(line){
    line.montantHtBrut=line.product.productPrixHT*line.quantity
    line.remiseValeur=line.montantHtBrut*(line.remiseTaux/100);
    line.montantHt=line.montantHtBrut-line.remiseValeur;
    line.montantFaudec=line.montantHt*(line.product.productFodec/100);
    line.montantTva=(line.montantHt+line.montantFaudec)*(line.product.productTVA/100);
    this.calculPrixTotalDevis();
  }

  calculPrixTotalDevis() {
    this.devis.totalHTBrut = 0;
    this.devis.totalHT = 0;
    this.devis.totalTVA = 0;
    this.devis.totalFodec = 0;
    this.devis.remise = 0;
    this.devis.totalTaxe = this.devis.totalTVA + this.devis.totalFodec + this.devis.timbreFiscal;
    this.devis.totalTTC = this.devis.totalHT + this.devis.totalTaxe;

    this.timeLine.timeLineTable.forEach((line) => {
      this.devis.totalHTBrut += line.montantHtBrut;
      this.devis.totalHT += line.montantHt;
      this.devis.totalTVA += line.montantTva;
      this.devis.totalFodec += line.montantFaudec;
      this.devis.remise += line.remiseValeur;
      this.devis.totalTaxe = this.devis.totalTVA + this.devis.totalFodec + this.devis.timbreFiscal;
      this.devis.totalTTC = this.devis.totalHT + this.devis.totalTaxe;
    })
    this.devis.totalHTBrut=this.convertAmount(this.devis.totalHTBrut);
    this.devis.totalHT=this.convertAmount(this.devis.totalHT);
    this.devis.totalTVA=this.convertAmount(this.devis.totalTVA);
    this.devis.totalFodec=this.convertAmount(this.devis.totalFodec);
    this.devis.remise=this.convertAmount(this.devis.remise);
    this.devis.totalTaxe=this.convertAmount(this.devis.totalTaxe);
    this.devis.totalTTC=this.convertAmount(this.devis.totalTTC);
  }

  convertAmount(amount):any
  {
    return amount=Math.round(amount * 1000) / 1000;
  }

  changeDevisDate() {
    this.minDevisDeadllineDate = this.devis.devisDate;
    if (this.devis.devisDate > this.devis.devisDeadlineDate) {
      this.devis.devisDeadlineDate = this.devis.devisDate;

    }
    const factureDate = new Date(this.devis.devisDate);
    let limitDate: Date;
    limitDate = new Date(this.devis.devisDeadlineDate);
    const time = (limitDate.valueOf() - factureDate.valueOf()) / 86400000;
    this.devis.devisDeadlineInNumberOfDays = time;
  }

  changeNumberOfDeadlineDaysNumber() {
    const devisDate = new Date(this.devis.devisDate);
    let limitDate: Date;
    limitDate = new Date(this.devis.devisDate);
    limitDate.setDate(devisDate.getDate() + this.devis.devisDeadlineInNumberOfDays);
    this.devis.devisDeadlineDate = this.datePipe.transform(limitDate, 'yyyy-MM-dd');
  }

  changeDeadLineDate() {
    const limitDate = new Date(this.devis.devisDeadlineDate);
    const devisDate = new Date(this.devis.devisDate);
    const time = (limitDate.valueOf() - devisDate.valueOf()) / 86400000;
    this.devis.devisDeadlineInNumberOfDays = time;

  }
}
