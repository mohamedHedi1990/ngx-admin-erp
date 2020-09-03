import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {UtilsServiceService} from '../../../../utils-service.service';
declare var require: any;

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;
  @Input() message: string;
  axios = require('axios');
  isDeleted: boolean = false;
  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private UtilsService: UtilsServiceService) {}

  dismiss() {
    this.ref.close(this.isDeleted);
  }
}
