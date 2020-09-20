import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'ngx-add-new-societe',
  templateUrl: './add-new-societe.component.html',
  styleUrls: ['./add-new-societe.component.scss'],
})
export class AddNewSocieteComponent implements OnInit {

  @Input() societe = {
    campanyId: null,
    campanyName: '',
    campanyAddress: '',
    campanyUniqueIdentifier: '',
    campanyPhoneNumber: '',
    companyIllustration: '',
    campanyEmail: '',
    companyManagerName: '',
    companyPictureUrl: [],
  };
  @Output() addNewSocieteEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  saveSociete() {
    this.addNewSocieteEvent.emit(this.societe);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkCompanyValid(): boolean {
    return this.societe.campanyAddress == null || this.societe.campanyAddress === '' ||
      this.societe.campanyName == null || this.societe.campanyName === '' ||
      this.societe.campanyUniqueIdentifier == null || this.societe.campanyUniqueIdentifier === '' ||
      this.societe.companyManagerName == null || this.societe.companyManagerName === '';
  }




}
