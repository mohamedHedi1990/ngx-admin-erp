import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-add-new-provider',
  templateUrl: './add-new-provider.component.html',
  styleUrls: ['./add-new-provider.component.scss'],
})
export class AddNewProviderComponent implements OnInit {
  @Input() provider = {
    providerId: null,
    providerLabel: '',
    providerAddress: '',
    providerUniqueIdentifier: '',
    providerManagerName: '',
    providerTel: '',
    providerEmail: '',
    providerContacts: [],
  };
  @Output() addNewProviderEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  addNewContact() {
    this.provider.providerContacts.push({
      contactName : '',
      contactPost : '',
      contactTel : '',
      contactEmail : '',
    });
  }
  cancel() {
    this.cancelEvent.emit();
  }

}
