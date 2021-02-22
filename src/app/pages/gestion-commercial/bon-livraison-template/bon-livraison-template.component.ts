import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {UtilsServiceService} from "../../../utils-service.service";

@Component({
  selector: 'ngx-bon-livraison-template',
  templateUrl: './bon-livraison-template.component.html',
  styleUrls: ['./bon-livraison-template.component.scss']
})
export class BonLivraisonTemplateComponent implements OnInit {
  @Input() complet;
  @Output() cancelTemplateEvent = new EventEmitter();
  @Input() bonLivraison:any;
  company:any= {
    campanyDetail: '',
    campanyRCNumber: '',
    campanyFax: '',
    campanyAddress: '',
    campanyEmail: '',
    campanyId: null,
    campanyName: '',
    campanyPhoneNumber: '',
    campanyUniqueIdentifier: '',
    companyLogoUrl: '',
    companyManagerName: '',
    companySignatureUrl:null
  }
  montantEnLetter="";

  constructor( private utilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.getCompany();
    const nombre_en_lettre = require('../../../../../scripts/number-to-lettre.js');
    this.montantEnLetter = nombre_en_lettre(this.bonLivraison.totalTTC, "dinars", "millimes");
  }

  getCompany(){
    this.utilsService.get(UtilsServiceService.API_COMPANY+'/current').subscribe(response => {
     this.company = response;
       },
        error => {

    });
  }

  generatePDF() {
    window.print();
    /*var data = document.getElementById('bonlivraison');
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

      pdf.save(this.bonLivraison.bonLivraisonNumber + '.pdf');
    });*/
  }


  cancel() {
    this.cancelTemplateEvent.emit();
  }
}
