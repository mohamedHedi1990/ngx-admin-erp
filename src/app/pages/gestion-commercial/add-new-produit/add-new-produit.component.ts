import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";

@Component({
  selector: 'ngx-add-new-produit',
  templateUrl: './add-new-produit.component.html',
  styleUrls: ['./add-new-produit.component.scss']
})
export class AddNewProduitComponent implements OnInit {
  @Input() produit ={
    productId: null,
    productLabel: '',
    productReference: '',
    productDescription: '',
    productUrlImage: '',
    productPrixHT:0,
    productTVA:0,
    productFodec:0,
    productTTC:0,
    productTTCS:'0.000',
    productUnite:'PIECE',
    productType:'MATERIEL'
  };
  @Output() addNewProduitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  showProduitWindow = false;

  form:any=null;
  selectedFile:any=null;
 disabled=true;
  constructor(private utilsService:UtilsServiceService) { }

  ngOnInit(): void {
  }

  saveProduit() {
    this.addNewProduitEvent.emit(this.produit);
  }

  cancel() {
    this.cancelEvent.emit();
  }
  checkProductValid()
  {
    return this.produit.productLabel ===null || this.produit.productLabel ==='' ||
           this.produit.productReference===null || this.produit.productReference ===''||
           this.produit.productDescription===null || this.produit.productReference===''||
           this.produit.productPrixHT===null||this.produit.productTVA===null;
  }

  selectFile(event,form){
    this.selectedFile=event.files[0];
    this.form=form;
    this.disabled=false;
  }

  clear(event){
    this.form.clear();
    this.disabled=true;
  }
 updatePrixTTC()
 {
   if(this.produit.productFodec == null) {
     this.produit.productFodec =0;
   }
   if(this.produit.productTVA == null) {
    this.produit.productTVA =0;
  }
  if(this.produit.productPrixHT == null) {
    this.produit.productPrixHT =0;
  }
   this.produit.productTTC=this.produit.productPrixHT*(1+this.produit.productTVA /100)*(1+this.produit.productFodec /100);
  this.produit.productTTC=Math.round(this.produit.productTTC * 1000) / 1000;
  this.produit.productTTCS=this.utilsService.convertAmountToString(String(this.produit.productTTC));
 }
  hideProduitWindow() {
    this.showProduitWindow = false;
  }

}
