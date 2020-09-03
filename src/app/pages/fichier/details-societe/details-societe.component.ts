import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ShowcaseDialogComponent} from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'ngx-details-societe',
  templateUrl: './details-societe.component.html',
  styleUrls: ['./details-societe.component.scss'],
})
export class DetailsSocieteComponent implements OnInit {
  @Input() company = {
    campanyId: null,
    campanyName : '',
    campanyAddress: '',
    campanyUniqueIdentifier: '',
    campanyPhoneNumber : '',
    campanyEmail: '',
    companyPictureUrl: '',
  };

  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  constructor(public sanitizer: DomSanitizer,  private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  editCompany() {
    this.editEvent.emit(this.company);
  }

  deleteCompany() {
    this.deleteEvent.emit(this.company);
  }

}
