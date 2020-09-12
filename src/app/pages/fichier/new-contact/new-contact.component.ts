import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent implements OnInit {
@Input() contact = {
  contactName : '',
  contactPost : '',
  contactTel : '',
  contactEmail : '',
};
  constructor() { }

  ngOnInit(): void {
  }

}
