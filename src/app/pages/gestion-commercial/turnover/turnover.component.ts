import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.scss']
})
export class TurnoverComponent implements OnInit {

  filteredCustomers: any[]=[];
  selectedCustomers: any[]=[];
  factures: any[];
  customers: any[];
  withProduct=false;
  withCustomer=false;
  filteredProducts: any[]=[];
  selectedProducts: any[]=[];
  products: any[];


  maxbeginDate;
  minEndDate;
  maxEndDate;

  chiffreAffaire={
    factures:[],
    sommeHt:'0,000',
    sommeTTC:'0,000',
}
      currentDate;
      currentTime

 dates={
    "beginDate":null,
    "endDate":null
 }
 company={
   'campanyName':''
 }

  constructor(private utilsService: UtilsServiceService, private datePipe:DatePipe) {

  }

  ngOnInit(): void {
    let date=new Date();
    this.currentDate=this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.currentTime=date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    this.maxbeginDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.minEndDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dates.endDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');;
    this.dates.beginDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');;
    //this.dates.beginDate=new Date(this.maxEndDate.getYear()-1,this.maxEndDate.getMonth(),this.maxEndDate.getDay());
    this.getChiffreAffaire();
    this.getCompany();
    this.getCustomers();
    this.getProducts();
  }

  getCustomers(){
    this.utilsService.get(UtilsServiceService.API_CLIENT).subscribe( response => {
        this.customers = response;
        this.filteredCustomers=this.customers;
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des clients`);
      });
  }

  getProducts(){
    this.utilsService.get(UtilsServiceService.API_PRODUIT).subscribe( response => {
        this.products = response;
      },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des produits`);
      });
  }

  getChiffreAffaire(){
    this.maxbeginDate=this.dates.endDate;
    this.minEndDate=this.dates.beginDate;
    let dates = {
      'beginDate':new Date(this.dates.beginDate),
      'endDate':new Date(this.dates.endDate)
    }
    this.utilsService.post(UtilsServiceService.API_FACTURE + "/by-date-between" , dates).subscribe(response => {
      this.initChiffreAffaire();
      this.chiffreAffaire.factures = response;
      //this.filterFactures();
      },
      error => {

      });
  }

  calculTotals(){

    let sommeHt =0;
    let sommeTTC =0;
    if(this.withProduct==false) {
      this.chiffreAffaire.factures.forEach(facture => {
        if (facture.factureType === 'FACTURE') {
          sommeHt += facture.totalHT;
          sommeTTC += facture.totalTTC;
        } else {
          sommeHt -= facture.totalHT;
          sommeTTC -= facture.totalTTC;
        }
      })
    }else{
      this.chiffreAffaire.factures.forEach(factureProduct => {
        if (factureProduct.facture.factureType === 'FACTURE') {
          sommeHt += factureProduct.factureLine.montantHt;
          sommeTTC += factureProduct.factureLine.montantHtBrut;
        } else {
          sommeHt -= factureProduct.factureLine.montantHt;
          sommeTTC -= factureProduct.factureLine.montantHtBrut;
        }
      })
    }
    this.chiffreAffaire.sommeHt=this.utilsService.convertAmountToString(sommeHt + '');
    this.chiffreAffaire.sommeTTC=this.utilsService.convertAmountToString(sommeTTC + '');
  }

  initChiffreAffaire(){
    this.chiffreAffaire={
      factures:[],
      sommeHt:'0,000',
      sommeTTC:'0,000',
    }
  }

  generatePDF() {
    var data = document.getElementById('chiffreAffaire');
    html2canvas(data).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      //var imgHeight = canvas.height * imgWidth / canvas.width;
      var imgHeight = 295;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var pageHeight = pdf.internal.pageSize.getHeight();
      var position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save( 'CA-.pdf');
    });
  }


  getCompany(){
    this.utilsService.get(UtilsServiceService.API_COMPANY+'/current').subscribe(response => {
        this.company = response;
      },
      error => {

      });
  }

  filter(){
        let filter={
          'productList':this.selectedProducts,
          'customerList':this.selectedCustomers,
          'beginDate':new Date(this.dates.beginDate),
          'endDate':new Date(this.dates.endDate)
        }
      if(this.selectedProducts.length >0){
        this.withProduct=true;
      }else{
        this.withProduct=false;
      }
     if(! this.withProduct) {
       this.utilsService.post(UtilsServiceService.API_FACTURE + "/find-by-filter-without-product", filter).subscribe(response => {
           this.initChiffreAffaire();
           this.chiffreAffaire.factures = response;
           this.calculTotals();
         },
         error => {

         });
     }
        else{
         this.utilsService.post(UtilsServiceService.API_FACTURE + "/find-by-filter-with-product" , filter).subscribe(response => {
             this.initChiffreAffaire();
             this.chiffreAffaire.factures = response;
             this.calculTotals();
           },
           error => {

           });
        }

  }

  filterCustomer(event) {
    this.filteredCustomers=[]
    let filtered : any[] = [];
    let query = event.query;
    if(query.length>0) {
      for (let i = 0; i < this.customers.length; i++) {
        let customer = this.customers[i];
        if (customer.customerLabel.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(customer);
        }
      }
      this.filteredCustomers = filtered;
    }else{
      this.filteredCustomers=filtered
    }
    //this.calculTotals();
  }
  filterCustomers(){
        if(this.filteredCustomers.length==0){
          this.filteredCustomers=this.customers
        }
  }


  filterProduct(event) {
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      if (product.productLabel.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(product);
      }
    }
    this.filteredProducts = filtered;
    //this.calculTotals();
  }


/*
  selectProduct(){
        this.withProduct=true;
     // this.filterFactures();
  }

  UnselectProduct(){
        if(this.selectedProducts.length==0)
         this.withProduct=false;
   // this.filterFactures();
  }
*/
  /*filterFactures(){
    this.factures = [];
    if(this.withProduct && this.withCustomer) {
      this.factures = this.filterWithProductAndCustomer();
    }
    else if(this.withCustomer){
        this.factures=this.filterWithCustomer();
      }
    else if(this.withProduct){
        this.factures=this.filterWithProduct();
      }
    else{
        this.factures=this.chiffreAffaire.factures;
      }
    this.calculTotals();
  }*/

  /*filterWithProduct(){
    let factures=[];
    this.chiffreAffaire.factures.forEach(facture => {
      facture.factureLines.forEach(factureLine => {
        this.selectedProducts.forEach(product => {
          if (product.productId === factureLine.product.productId) {
            let factureProduct={
              'facture':facture,
              'factureline':factureLine
            }
            factures.push(factureProduct);
          }
        })
      })
    });
    return factures;
  }*/
/*
  filterWithProductAndCustomer(){
    let factureCustomers=[]
    let factures=[]
    this.chiffreAffaire.factures.forEach(facture => {
      this.selectedCustomers.forEach(customer => {
        if (customer.customerId === facture.customer.customerId) {
          factureCustomers.push(facture);
        }
      })
    });

    factureCustomers.forEach(facture => {
      facture.factureLines.forEach(factureLine => {
        this.selectedProducts.forEach(product => {
          if (product.productId === factureLine.product.productId) {
            let factureProduct={
              'facture':facture,
              'factureline':factureLine
            }
            factures.push(factureProduct);
          }
        })
      })
    });
   return factures;
  }

  filterWithCustomer(){
    let factures=[];
    this.chiffreAffaire.factures.forEach(facture => {
      this.selectedCustomers.forEach(customer => {
        if (customer.customerId === facture.customer.customerId) {
          factures.push(facture);
        }
      })
    });
    return factures;
  }*/
}
