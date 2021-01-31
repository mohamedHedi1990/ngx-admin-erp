import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-edit-facture',
  templateUrl: './edit-facture.component.html',
  styleUrls: ['./edit-facture.component.scss']
})
export class EditFactureComponent implements OnInit {

  @Input() facture = {
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
  }
  @Output() editFactureEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  clients = [];
  produits = [];
  maxDateFactureDate;
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
    this.facture.factureDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDateFactureDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.minDateDeadlineDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.initiateLine();
    this.getAllCustomers();
    this.getAllProdcuts();
    this.initProduit();
    this.facture.factureLines.forEach(line=>{
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
          this.facture.customer = this.clients[0];
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
          this.calculPrixTotalFacture();
        },
        error => {
          this.UtilsService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors du du Suppression De ligne`);
        });
    }else{
      this.timeLine.timeLineTable.splice(i, 1);
      this.calculPrixTotalFacture();
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
    this.calculPrixTotalFacture();
    this.initiateLine();
  }


  cancel() {
    this.cancelEvent.emit();
  }
  checkGeneratedFactureValid() {
    return this.facture.factureNumber == "" || this.facture.factureNumber == null ||
      this.facture.customer == "" || this.facture.customer == null ||
      this.timeLine.timeLineTable.length == 0;
  }
  saveGeneratedFacture(){
    this.facture.factureLines=this.timeLine.timeLineTable;
    this.editFactureEvent.emit(this.facture);
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
    this.calculPrixTotalFacture();
  }

  calculPrixTotalEdited(line){
    line.montantHtBrut=line.product.productPrixHT*line.quantity
    line.remiseValeur=line.montantHtBrut*(line.remiseTaux/100);
    line.montantHt=line.montantHtBrut-line.remiseValeur;
    line.montantFaudec=line.montantHt*(line.product.productFodec/100);
    line.montantTva=(line.montantHt+line.montantFaudec)*(line.product.productTVA/100);
    this.calculPrixTotalFacture();
  }

  calculPrixTotalFacture() {
    this.facture.totalHTBrut = 0;
    this.facture.totalHT = 0;
    this.facture.totalTVA = 0;
    this.facture.totalFodec = 0;
    this.facture.remise = 0;
    this.facture.totalTaxe = this.facture.totalTVA + this.facture.totalFodec + this.facture.timbreFiscal;
    this.facture.totalTTC = this.facture.totalHT + this.facture.totalTaxe;

    this.timeLine.timeLineTable.forEach((line) => {
      this.facture.totalHTBrut += line.montantHtBrut;
      this.facture.totalHT += line.montantHt;
      this.facture.totalTVA += line.montantTva;
      this.facture.totalFodec += line.montantFaudec;
      this.facture.remise += line.remiseValeur;
      this.facture.totalTaxe = this.facture.totalTVA + this.facture.totalFodec + this.facture.timbreFiscal;
      this.facture.totalTTC = this.facture.totalHT + this.facture.totalTaxe;
    })
    this.facture.totalHTBrut=this.convertAmount(this.facture.totalHTBrut);
    this.facture.totalHT=this.convertAmount(this.facture.totalHT);
    this.facture.totalTVA=this.convertAmount(this.facture.totalTVA);
    this.facture.totalFodec=this.convertAmount(this.facture.totalFodec);
    this.facture.remise=this.convertAmount(this.facture.remise);
    this.facture.totalTaxe=this.convertAmount(this.facture.totalTaxe);
    this.facture.totalTTC=this.convertAmount(this.facture.totalTTC);
  }

  convertAmount(amount):any
  {
    return amount=Math.round(amount * 1000) / 1000;
  }

  changeFactureDate() {
    this.minDateDeadlineDate = this.facture.factureDate;
    if (this.facture.factureDate > this.facture.factureDeadlineDate) {
      this.facture.factureDeadlineDate = this.facture.factureDate;

    }
    const factureDate = new Date(this.facture.factureDate);
    let limitDate: Date;
    limitDate = new Date(this.facture.factureDeadlineDate);
    const time = (limitDate.valueOf() - factureDate.valueOf()) / 86400000;
    this.facture.factureDeadlineInNumberOfDays = time;


  }
  changeNumberOfDeadlineDaysNumber() {
    const factureDate = new Date(this.facture.factureDate);
    let limitDate: Date;
    limitDate = new Date(this.facture.factureDate);
    limitDate.setDate(factureDate.getDate() + this.facture.factureDeadlineInNumberOfDays);
    this.facture.factureDeadlineDate = this.datePipe.transform(limitDate, 'yyyy-MM-dd');
  }

  changeDeadLineDate() {
    const limitDate = new Date(this.facture.factureDeadlineDate);
    const factureDate = new Date(this.facture.factureDate);
    const time = (limitDate.valueOf() - factureDate.valueOf()) / 86400000;
    this.facture.factureDeadlineInNumberOfDays = time;

  }


}
