import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'ngx-add-new-societe',
  templateUrl: './add-new-societe.component.html',
  styleUrls: ['./add-new-societe.component.scss'],
})
export class AddNewSocieteComponent implements OnInit {

  @Input() societe = {
    campanyId: null,
    campanyName: '',
    campanyDetail: '',
    campanyRCNumber: '',
    campanyFax: '',
    campanyAddress: '',
    campanyUniqueIdentifier: '',
    campanyPhoneNumber: '',
    companyIllustration: '',
    campanyEmail: '',
    companyManagerName: '',
    companyPictureUrl: [],
    companyLogoUrl: null,
    companySignatureUrl: null,
  };
  @Output() addNewSocieteEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  signatureImagePath;
  signatureImgURL: any;
  logoImagePath;
  logoImgURL: any;
  logo = null;
  signature:null;
  messageLogoErrorType ='seulement les fichiers de type image sont autorisés!'
  showerrorTypeLogo = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.societe.companyLogoUrl != null) {
      this.logoImgURL = this.societe.companyLogoUrl;
      this.signatureImgURL = this.societe.companySignatureUrl;

    }
  }

  saveSociete() {
    const companyObject = {
      company: this.societe,
      logo: this.logo,
      signature:this.signature
    }
    this.addNewSocieteEvent.emit(companyObject);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkCompanyValid(): boolean {
    return this.societe.campanyAddress == null || this.societe.campanyAddress === '' ||
      this.societe.campanyName == null || this.societe.campanyName === '' ||
      this.societe.campanyUniqueIdentifier == null || this.societe.campanyUniqueIdentifier === '' ||
      this.societe.companyManagerName == null || this.societe.companyManagerName === '' ||
      this.societe.campanyRCNumber == null || this.societe.campanyRCNumber === ''
      ;
  }

  previewLogo(files) {
    if (files.length === 0) {
      return;
    }
    this.logo = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showerrorTypeLogo = true;
      return;
    }

    const reader = new FileReader();
    this.logoImagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logoImgURL = reader.result;
    };
  }

  previewSignature(files) {
    if (files.length === 0) {
      return;
    }
    this.signature = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showerrorTypeLogo = true;
      return;
    }

    const reader = new FileReader();
    this.signatureImagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.signatureImgURL = reader.result;
    };
  }


}
