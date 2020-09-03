import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'ngx-saisir-societe',
  templateUrl: './saisir-societe.component.html',
  styleUrls: ['./saisir-societe.component.scss'],
})
export class SaisirSocieteComponent implements OnInit {
  @Input() company = {
    campanyId: null,
    campanyName : '',
    campanyAddress: '',
    campanyUniqueIdentifier: '',
    campanyPhoneNumber : '',
    campanyEmail: '',
    companyPictureUrl: '',
  };
  imagePath;
  imgURL: any;
  message: string;
  newsIlustration;
  @Output() cancelcaompanyWindo = new EventEmitter();
  @Output() addNewCompanyEvent = new EventEmitter();
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  addCompany() {
    const passedCompany = {
      campanyId: this.company.campanyId,
      campanyName : this.company.campanyName,
      campanyAddress: this.company.campanyAddress,
      campanyUniqueIdentifier: this.company.campanyUniqueIdentifier,
      campanyPhoneNumber : this.company.campanyPhoneNumber,
      companyIllustration: this.newsIlustration,
      campanyEmail: this.company.campanyEmail,
      companyPictureUrl: this.company.companyPictureUrl,
    };
    this.addNewCompanyEvent.emit(passedCompany);
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    this.newsIlustration = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
