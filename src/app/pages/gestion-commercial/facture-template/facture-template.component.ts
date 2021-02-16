import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'ngx-facture-template',
  templateUrl: './facture-template.component.html',
  styleUrls: ['./facture-template.component.scss']
})
export class FactureTemplateComponent implements OnInit {

  @Input() complet;
  @Output() cancelTemplateEvent = new EventEmitter();
  @Input() facture:any;
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
    companyManagerName: ''
  }

  constructor( private utilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.getCompany();
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
    /*var data = document.getElementById('facture');
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

      pdf.save(this.facture.factureNumber + '.pdf');
    });*/
  }


  cancel() {
    this.cancelTemplateEvent.emit();
  }

}
