import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-nouvelle-comission',
  templateUrl: './nouvelle-comission.component.html',
  styleUrls: ['./nouvelle-comission.component.scss'],
})
export class NouvelleComissionComponent implements OnInit {
@Input() comission= {
  comissionLabel : '',
  comissionOperation: null,
  comissionValue: 0,
  commissionType: null,
};
  constructor() { }

  ngOnInit(): void {
  }

}
