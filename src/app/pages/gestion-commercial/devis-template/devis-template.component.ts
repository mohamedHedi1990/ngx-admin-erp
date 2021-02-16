import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from "../../../utils-service.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'ngx-devis-template',
  templateUrl: './devis-template.component.html',
  styleUrls: ['./devis-template.component.scss']
})
export class DevisTemplateComponent implements OnInit {

  @Input() complet;
  @Output() cancelTemplateEvent = new EventEmitter();
  @Input() devis:any;
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
    /*var data = document.getElementById('devis');
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

      pdf.save(this.devis.devisNumber + '.pdf');
    });*/
  }


  cancel() {
    this.cancelTemplateEvent.emit();
  }
}
